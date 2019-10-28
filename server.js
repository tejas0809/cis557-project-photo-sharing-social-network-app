const express = require('express');

const webapp = express();

const bodyParser = require('body-parser');
const db = require('./database.js');
// alert("db");

webapp.use(express.static('html'))

const port = 8080;

webapp.use(bodyParser.urlencoded({
  extended: true,
}));

webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

// Other API endpoints
webapp.get('/posts/:id', (req, res) => {
  console.log('READ all posts of a user');
  const sql = 'select * from post where user_id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});


webapp.get('/users', (req, res) => {
  console.log('READ all users');
  const sql = 'select * from users';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

webapp.get('/user/:id', (req, res) => {
  console.log('READ a student by id');
  const sql = 'select * from users where user_id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

webapp.post("/user_register", (req, res) => {
  // alert("hello");
  console.log('CREATING a new user');
  if (!req.body.username || !req.body.email || !req.body.fname || !req.body.lname || !req.body.password) {
    res.status(400).json({ error: 'missing username or email or firstName or lastName or password' });
    return;
  }
  // create student object
  const newUser = {
    // user_id: req.body.user_id,
    username: req.body.username,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    // followers: req.body.followers,
    // following: req.body.following,
    // postcount: req.body.postcount
  };
  console.log(newUser);
  //insert newStudent
  const insert = 'INSERT INTO users (username, fname, lname, email, password) VALUES (?,?,?,?,?)';
  // const sql = 'INSERT INTO users (username, fname, lname, email, password) VALUES (?,?,?,?,?)';
  const values = [newUser.username, newUser.fname, newUser.lname, newUser.email, newUser.password];
  db.run(insert, values, function (err, result) {
    if (err) {
      console.log("errrrrrrr");
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      user: newUser,
      id: this.lastID,
    });
  });
});
