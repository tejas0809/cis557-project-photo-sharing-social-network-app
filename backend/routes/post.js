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

router.get('/user:email', (req, res) => {
  const sql = 'select * from posts where email = ?';
  const params = [req.params.email];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.status(200).json({
      message: 'success',
      photos: rows,
    });
  });

});

router.post('/user:email',
multer({storage: storage}).single('image'),
(req, res) => {
  const url = req.protocol + '://' + req.get("host");

  const newPhoto = {
    imagePath: url + "/images/" + req.file.filename,
    caption: req.body.caption,
    email: req.params.email
  }

  const insert = 'INSERT INTO posts (imagePath, caption, email) VALUES (?,?,?)';
  const values = [newPhoto.imagePath, newPhoto.caption, newPhoto.email];

  db.run(insert, values, function (err, result) {
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

});


module.exports = router;
