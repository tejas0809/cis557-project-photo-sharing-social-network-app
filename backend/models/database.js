var mysql = require('mysql');

const DB_NAME = 'pixagramdb';
var con = mysql.createConnection({
  host: 'pixagramdb.ccxkiclbondr.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'root',
  password: 'password',
  database: DB_NAME
  });
  con.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    con.query(`CREATE TABLE IF NOT EXISTS users
    (
      email VARCHAR(150) NOT NULL,
      password VARCHAR(200) NOT NULL,
      fname VARCHAR(150) NOT NULL,
      lname VARCHAR(150) NOT NULL,
      bio  VARCHAR(300),
      dob DATE,
      gender VARCHAR(20),
      country VARCHAR(20),
      city VARCHAR(20),
      profileImagePath VARCHAR(1500) default 'http://localhost:3000/images/def_Profile.jpg',
      coverImagePath VARCHAR(1500) default 'http://localhost:3000/images/def_Cover.jpg',
      visibility VARCHAR(20) default 'public',
      PRIMARY KEY     (email)
    )`,function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

    con.query(`CREATE TABLE IF NOT EXISTS posts
    (
      id INT unsigned NOT NULL AUTO_INCREMENT,
      postTimestamp timestamp default current_timestamp NOT NULL,
      imagePath VARCHAR(1000) NOT NULL,
      caption VARCHAR(500) DEFAULT '',
      userEmail VARCHAR(150) NOT NULL,
      PRIMARY KEY     (id),
      FOREIGN KEY (userEmail)
      REFERENCES Users (email)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    )`,function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });


    con.query(`CREATE TABLE IF NOT EXISTS tags(
      post_id int(10) unsigned NOT NULL,
      email VARCHAR(150) NOT NULL,
      PRIMARY KEY(post_id,email),
      FOREIGN KEY (email) REFERENCES Users(email) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY(post_id) REFERENCES Posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    )`,function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });


    con.query(`CREATE TABLE IF NOT EXISTS follows
    (
      email1 VARCHAR(150) NOT NULL,
      email2 VARCHAR(150) NOT NULL,
      followsTimestamp timestamp default current_timestamp NOT NULL,
      PRIMARY KEY (email1,email2),
      FOREIGN KEY (email1) REFERENCES Users(email) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (email2) REFERENCES Users(email) on update cascade on delete cascade
  )`,function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });


  con.query(`CREATE TABLE IF NOT EXISTS comments(
    commentId int(10) unsigned NOT NULL AUTO_INCREMENT,
    post_id int(10) unsigned NOT NULL,
    email VARCHAR(150) NOT NULL, content varchar(4000) NOT NULL,
    commentsTimestamp timestamp default current_timestamp NOT NULL,
    PRIMARY KEY (commentId),
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (email) REFERENCES Users(email) on update cascade on delete cascade
  )`,

  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

    con.query(`CREATE TABLE IF NOT EXISTS likes
    (
    email VARCHAR(150) NOT NULL,
    postId INT unsigned NOT NULL,
    likesTimestamp timestamp default current_timestamp NOT NULL,
    PRIMARY KEY     (email,postId),
    FOREIGN KEY (email)
      REFERENCES Users (email)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY (postId)
      REFERENCES Posts (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    )`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

module.exports = con;
