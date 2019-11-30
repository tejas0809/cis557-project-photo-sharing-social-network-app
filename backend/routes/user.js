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
router.get('/following:email',(req,res) => getFollowing(req,res));
router.get('/followers:email',(req,res) => getFollowers(req,res));
router.get('/followerCount:email',(req,res) => getFollowerCount(req,res));
router.get('/activityFeed/:email',(req,res) => getActivityFeedPosts(req,res));
router.get('/:email', (req, res) => getUser(req, res));
router.post('/signup', (req, res) => signupNewUser(req,res));
router.post('/login', (req, res) => loginUser(req,res));
router.post('/follow', (req,res)=> followUser(req,res));
router.delete('/unfollow',(req, res) => unfollowUser(req,res));




function getAllUsers(req,res) {
  console.log('READ all users');
  const sql = 'select * from Users';
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
  const sql = 'select * from Users where email = ?';
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

     const insert = 'INSERT INTO Users (email, password, fname, lname, dob, gender, country, city, bio) VALUES (?,?,?,?,?,?,?,?,?)';
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
    user1: req.body.user1,
    user2: req.body.user2
  };
  console.log("User unfollowing another user");
  const sqlDelete = 'Delete from Follows where email1 = ? and email2 = ?';
  const values = [follow.user1, follow.user2];

  db.query(sqlDelete, values, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({
      message: 'success',
      follow: follow,
    });
  });
}

function followUser(req,res) {
  const follow = {
    user1: req.body.user1,
    user2: req.body.user2
  };

  const insert = 'INSERT INTO Follows (email1, email2) VALUES (?,?)';
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
    res.json({
      message: 'success',
      follow: follow,
    });
  });
}

function loginUser(req, res) {
  const sql = 'select * from Users where email = ?';
  const params = [req.body.email, req.body.password];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(401).json({ error: 'err: Authentication Failed' });
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
        return res.status(401).json({ error: 'Authentication Failed' });
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
          email: email
        });
      }
      else {
        // response is OutgoingMessage object that server response http request
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
    });
  });

}



function getFollowers(req, res) {
  console.log("Get all followers of a user");
  const sql = 'select User.email,User.fname, User.lname, User.bio, User.profileimagePath from Follows inner join Users on Users.email=Follows.email1 where Follows.email2 = ?';
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
  const sql = 'select count(*) as count1 from Follows where email2 = ?';
  const params = [req.params.email];

  db.query(sql, params, (err, rows) => {
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


function getFollowing(req, res) {
  console.log("Get all the users which the current user is following");
  const sql = 'select Users.email,Users.fname, Users.lname, Users.bio, Users.profileimagePath from Follows inner join Users on Users.email=Follows.email2 where Follows.email1 = ?';
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
  const sql='select Post.id,Post.postTimestamp,Post.imagePath, Post.caption, Post.userEmail, Users.fname, Users.lname, Users.profileimagePath from Post inner join Follows on Post.userEmail=Follows.email2 inner join Users on Users.email=Follows.email2 where Follows.email1 = ? order by Post.postTimestamp';
  const params = [req.params.email];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      posts: rows,
    });
  });
}

module.exports = router;
