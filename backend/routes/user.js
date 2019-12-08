const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../models/database');
const bcrypt = require("bcrypt");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


router.get('/', (req, res) => getAllUsers(req,res));
router.get('/following/:email',(req,res) => getFollowing(req,res));
router.get('/followers/:email',(req,res) => getFollowers(req,res));
// router.get('/followerCount/:email',(req,res) => getFollowerCount(req,res));
router.get('/followingCount/:email',(req,res) => getFollowingCount(req,res));
router.get('/followersCount/:email',(req,res) => getFollowerCount(req,res));
router.get('/activityFeed/:email',(req,res) => getActivityFeedPosts(req,res));
router.get('/:email', (req, res) => getUser(req, res));
router.post('/signup', (req, res) => signupNewUser(req,res));
router.post('/login', (req, res) => loginUser(req,res));
// router.post('/follow', (req,res)=> followUser(req,res));
// router.delete('/unfollow',(req, res) => unfollowUser(req,res));
router.put('/:email',(req,res) => editUserProfile(req,res));
// router.get('/explore/:email',(req,res) => exploreUsers(req,res));
// router.get('/followSuggestions/:email',(req,res) => userSuggestions(req,res));
router.post('/follow/:email', (req,res)=> followUser(req,res));
router.delete('/unfollow/:email1&:email2',(req, res) => unfollowUser(req,res));




function getAllUsers(req,res) {
  console.log('READ all users');
  const sql = 'select * from users';
  const params = [];
  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(201).json({
      message: 'success',
      users: rows,
    });
  });
}


function  getUser(req, res)  {
  console.log('READ a user by email');
  const sql = 'select * from users where email = ?';
  const params = [req.params.email];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    if(row.length==0){
      return res.status(401).json({
        message: 'No user found!'
      })
    }

    res.json({
      message: 'success',
      user: row[0],
    });
  });
}

function signupNewUser(req, res) {
  console.log('Signing up new user');
  console.log(req.body);

  bcrypt.hash(req.body.password, 10).then( hash => {
    let password = hash;

      const newUser = {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        gender: req.body.gender,
        country: req.body.country,
        city: req.body.city,
        bio: req.body.bio
     };

     const insert = 'INSERT INTO users (email, password, fname, lname, dob, gender, country, city, bio) VALUES (?,?,?,?,?,?,?,?,?)';
     const values = [newUser.email, password, newUser.fname, newUser.lname, newUser.dob, newUser.gender, newUser.country, newUser.city, newUser.bio ];

      db.query(insert, values, function (err, result) {
        if (err) {
          console.log(err.message);
          if(err.message.includes("ER_DUP_ENTRY")){
            res.status(400).json({message:'User Already Exists! Select new email or login with existing one!'});
            return;

          }
          res.status(400).json({ message: err.message });
          return;
        }
        res.status(201).json({
          message: 'success',
          user: newUser
        });
      });
  });
}

function unfollowUser(req,res){
  const follow = {
    user1: req.params.email1,
    user2: req.params.email2
  };
  console.log("User unfollowing another user");

  const sqlDelete = 'Delete from follows where email1 = ? and email2 = ?';
  const values = [follow.user1, follow.user2];
  // console.log(values);
  db.query(sqlDelete, values, function (err, result) {
    console.log(result)
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    if(result.affectedRows==0){
      res.status(400).json({message:"No Change!"})
      return
    }
    res.status(200).json({
      message: 'successfully deleted',
    });
  });
}

function followUser(req,res) {
  const follow = {
    user1: req.body.email,
    user2: req.params.email
  };

  const insert = 'INSERT INTO follows (email1, email2) VALUES (?,?)';
  const values = [follow.user1, follow.user2];
  console.log("user following another user")
  db.query(insert, values, function (err, result) {
    if (err) {
      if(err.message.includes("ER_DUP_ENTRY")){
        res.status(400).json({message:'Already Following !'});
        return;
      }
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success'
    });
  });
}

function loginUser(req, res) {
  const sql = 'select * from users where email = ?';
  const params = [req.body.email, req.body.password];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(401).json({ error: 'Authentication Failed' });
      return;
    }

    console.log(req.body);
    if (row.length == 0) {
      return res.status(401).json({
        message: 'No User Found!'
      });
    }

    console.log(row[0].password);

    const email = row[0].email;
    console.log(email);

    bcrypt.compare(req.body.password, row[0].password, function(err, result) {
      if (err){
        // handle error
        return res.status(401).json({ message: 'Authentication Failed' });
      }
      if (result)
      {

        // Send JWT
        const token = jwt.sign(
          { email: email },
          'cis_557_programming_for_the_web_longer_secret_password',
          {expiresIn: '1h'}
        );

        return res.status(200).json({
          token:token,
          expiresIn: 3600,
          email: email,
          message: 'success'
        });
      }
      else {
        // response is OutgoingMessage object that server response http request
        return res.status(401).json({
          message: 'Authentication Failed'
        });
      }
    });
  });

}



function getFollowers(req, res) {
  console.log("Get all followers of a user");
  const sql = 'select users.email,users.fname, users.lname, users.bio, users.profileimagePath from follows inner join users on users.email=follows.email1 where follows.email2 = ?';
  const params = [req.params.email];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      followers: rows,
    });
  });
}


function getFollowerCount(req, res) {
  console.log("Get no of followers of a user");
  const sql = 'select count(*) as count1 from follows where email2 = ?';
  const params = [req.params.email];

  db.query(sql, params, (err, rows)  => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      followerCount: rows[0].count1,
    });
  });
}

function getFollowingCount(req, res) {
  console.log("Get no of users the current user is following");
  const sql = 'select count(*) as count1 from follows where email1 = ?';
  const params = [req.params.email];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      followingCount: rows[0].count1,
    });
  });
}



function getFollowing(req, res) {
  console.log("Get all the users which the current user is following");
  const sql = 'select users.email,users.fname, users.lname, users.bio, users.profileimagePath from follows inner join users on users.email=follows.email2 where follows.email1 = ?';
  const params = [req.params.email];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      following: rows,
    });
  });
}


function getActivityFeedPosts(req,res){
  console.log("getting posts of the people the current user is following in chronological order");
  const sql='select p.id as id, p.imagePath as imagePath, p.caption as caption, p.userEmail as email, u.fname as fname, u.lname as lname, u.profileImagePath as profileImagePath, if(likes.likesTimestamp IS NULL, FALSE, TRUE) AS flag from posts p inner join follows f on p.userEmail=f.email2 and f.email1 = ? inner join users u on u.email=f.email2 left join likes on p.id = likes.postId and f.email1 = likes.email order by p.postTimestamp';
  const params = [req.params.email];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      users: rows,
    });
  });
}

function editUserProfile(req,res){
  console.log("editing user profile");
  const sql='update users set fname=?, lname=?, bio=?, dob=?, gender=?, country=?, city=?, visibility=? where email=? ';
  const values=[req.body.fname, req.body.lname, req.body.bio, req.body.dob, req.body.gender,req.body.country,req.body.city,req.body.visibility,req.params.email];
  db.query(sql,values,(err,rows) =>{
    if(err){
      res.status(400).json({message:err.message});
      return;
    }
    res.status(200).json({
      message:'success'
    });
  });
}

module.exports = router;
