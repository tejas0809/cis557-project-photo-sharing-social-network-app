const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require('../models/database');

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


router.get('/:email', (req,res) => getPost(req,res));
router.get('/user/:email', (req, res) => getPostsOfUser(req,res));
router.post('/user/:email', multer({storage: storage}).single('image'), (req, res) => createPostOfUser(req,res));
router.post('/like:id' , (req,res) => likePost(req,res));
router.delete('/unlike:id',(req,res) => unlikePost(req,res));


function getPostsOfUser(req, res) {
  console.log("Get all posts of a user");
  const sql = 'select * from Posts where userEmail = ?';
  const params = [req.params.email];

    db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      photos: rows,
    });
  });
}

function createPostOfUser(req, res) {
  console.log("create a new post");
  const url = req.protocol + '://' + req.get("host");
  const newPhoto = {
    imagePath: url + "/images/" + req.file.filename,
    caption: req.body.caption,
    email: req.params.email
  }

  console.log(newPhoto);

  const insert = 'INSERT INTO Posts (imagePath, caption, userEmail) VALUES (?,?,?)';
  const values = [newPhoto.imagePath, newPhoto.caption, newPhoto.email];

  db.query(insert, values, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({
      message: 'success',
      post: newPhoto,
      id: this.lastID,
    });
  });
}

function getPost(req,res) {
  console.log("getting one post");
  const sql="select * from Posts where id= ?";
  const params=[req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    if(row.length==0){
      return res.status(401).json({
        message: 'No such Post found!'
      })
    }

    res.json({
      message: 'success',
      post: row,
    });
  });
}

function likePost(req,res){
  console.log("like a post");
  const values=[req.body.email,req.params.id];
  const sql="insert into Likes (email, postId) values (?,?)";
  db.query(sql,values,function(err,result){
    if(err){
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({
      message:'success',
      postlike:values
    })
  })
}

function unlikePost(req,res){
  console.log("unlike a post");
  const values=[req.body.email,req.params.id];
  const sql="delete from Likes where email=? and postId=?";
  db.query(sql,values,function(err,result){
    if(err){
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({
      message:'success',
      postunlike:values
    })
  })
}

module.exports = router;
