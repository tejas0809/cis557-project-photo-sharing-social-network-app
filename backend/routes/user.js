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

// router.get('', (req, res) => {
//   console.log('READ all users');
//   const sql = 'select * from users';
//   const params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(404).json({ error: err.message });
//       return;
//     }
//     res.status(201).json({
//       message: 'success',
//       data: rows,
//     });
//   });
// });



router.get('/:email', (req, res) => {
  console.log('READ a student by id');
  const sql = 'select * from users where email = ?';
  const params = [req.params.email];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(404).json({ message: err.message });
      return;
    }
    res.json({
      message: 'success',
      user: row,
    });
  });
});

router.post('/signup',
(req, res) => {
  // console.log(req);
  console.log(req.headers);
  console.log('hello');
  console.log(req.body);
  // console.log(req.file);

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

      db.run(insert, values, function (err, result) {
        if (err) {
          console.log('1'+err.message);
          res.status(400).json({ message: err.message });
          return;
        }
        res.status(201).json({
          message: 'success',
          user: newUser
        });
      });
  });
});

router.post('/login', (req, res) => {
  const sql = 'select * from users where email = ?';
  const params = [req.body.email];

  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(401).json({ error: 'Authentication Failed' });
      return;
    }
    result = bcrypt.compare(req.body.password, row.password);

    if(!result){
      return result.status(401).json({
        message: 'Auth Failed'
      });
    }

    const email = row.email;

    const token = jwt.sign(
      { email: email },
      'cis_557_programming_for_the_web_longer_secret_password',
      {expiresIn: '1h'}
    );

    res.status(200).json({
      token:token,
      expiresIn: 3600,
      email: email
    });

  });

});

module.exports = router;
