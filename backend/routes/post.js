const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require('../models/database');
const checkAuth = require("../middleware/check-auth");

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


router.get('/:id', (req,res) => getPost(req,res));
router.get('/user/:email', (req, res) => getPostsOfUser(req,res));
router.post('/user/:email', checkAuth, multer({storage: storage}).single('image'), (req, res) => createPostOfUser(req,res));
router.post('/like/:id' , checkAuth, (req,res) => likePost(req,res));
router.delete('/unlike/:id&:email', checkAuth, (req,res) => unlikePost(req,res));
router.put('/:id', checkAuth, (req,res) => editPost(req,res));
router.post('/comment/:id',checkAuth, (req,res) => addComment(req,res));
router.get('/comments/:id', (req,res) => getComments(req,res));
router.put('/comment/:id',checkAuth, (req,res) => editComment(req,res));
router.delete('/comment/:id',checkAuth, (req,res) => deleteComment(req,res));
router.delete('/:id',checkAuth, (req,res) => deletePost(req,res));

function getPostsOfUser(req, res) {
  console.log("Get all posts of a user");
  const sql = 'select * from posts where userEmail = ?';
  const params = [req.params.email];

  //db.all(sql, params, (err, rows) => {
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

  const insert = 'INSERT INTO posts (imagePath, caption, userEmail) VALUES (?,?,?)';
  const values = [newPhoto.imagePath, newPhoto.caption, newPhoto.email];

  db.query(insert, values, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(201).json({
      message: 'success',
      post: newPhoto,
      id: this.lastID,
    });
  });
}

function getPost(req,res) {
  console.log("getting one post");
  const sql="select * from posts where id= ?";
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
  const sql="insert into likes (email, postId) values (?,?)";
  db.query(sql,values,function(err,result){
    if(err){
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({
      message:'success',
      postlike:result
    });
  });
}

function unlikePost(req,res){
  console.log("unlike a post");
  const values=[req.params.email,req.params.id];
  const sql="delete from likes where email=? and postId=?";
  db.query(sql,values,function(err,result){
    if(err){
      console.log(err);
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({
      message:'success',
      postunlike:values
    });
  });
}

function editPost(req,res){
  console.log("edit a post");
  const values=[req.body.caption,req.params.id];
  const sql="update posts set caption=? where id=?";
  db.query(sql,values,function(err, result){
    if(err){
      console.log(err);
      res.status(400).json({message:err.message});
      return;
    }
    if(result.affectedRows==0)
    {
      res.status(400).json({message:"No Change!"})
      return;
    }
    res.json({
      message:'success',
    });
  });
}

function addComment(req,res){
  console.log("adding a new comment");
  const values=[req.params.id,req.body.email,req.body.content];
  const sql='insert into comments (post_id, email, content) values (?,?,?)';
  db.query(sql,values,function(err,result){
    if(err){
      console.log(err);
      res.status(400).json({message:err.message});
      return;
    }
    // const id1=result.insertId;
    const retComment={
      email:req.body.email,
      content:req.body.content
    }
    res.json({
      message:'success',
      comment:retComment,
      id: result.insertId
    });
  });
}

function getComments(req,res){
  console.log("getting all comments for a post");
  const values=[req.params.id];
  const sql='select comments.commentId as id, users.fname, users.lname, comments.content, comments.email, comments.commentsTimestamp from comments inner join users on comments.email=users.email where post_id=? order by comments.commentsTimestamp';
  db.query(sql,values,function(err,result){
    if(err){
      console.log(err);
      res.status(400).json({message:err.message});
      return;
    }
    res.json({
      message:'success',
      comments:result
    });
  });
}
// #########
function editComment(req,res){
  console.log("editing a comment");
  const values=[req.body.content,req.params.id]
  const sql="update comments set content=? where commentId=?";
  db.query(sql,values,(err,result) =>{
    if(err){
      res.status(400).json({message:err.message});
      return;
    }
    if(result.affectedRows==0)
    {
      res.status(400).json({message:"No Change!"})
      return;
    }
    res.status(200).json({
      message:'success'
    });
  });
}

function deleteComment(req,res){
  console.log("deleting a comment");
  const values=[req.params.id];
  const sql='delete from comments where commentId=?';
  db.query(sql,values,(err,rows) =>{
    if(err){
      res.status(400).json({message:err.message});
      return;
    }
    if(rows.affectedRows==0){
      res.status(400).json({message:"No Change!"})
      return;
    }
    res.status(200).json({
      message:'success'
    });
  });
}

function deletePost(req,res){
  console.log("delete a post");
  const values=[req.params.id];
  const sql='delete from posts where id=?';
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
