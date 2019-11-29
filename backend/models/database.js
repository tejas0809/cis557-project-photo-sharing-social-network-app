//const sqlite3 = require('sqlite3').verbose();
var mysql = require('mysql');

const DB_NAME = 'Pixagram';
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password', 
  database: DB_NAME
  });
  con.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    //con.query("CREATE TABLE User(email VARCHAR(150) NOT NULL,pswd VARCHAR(20) NOT NULL,fname VARCHAR(150) NOT NULL,lname VARCHAR(150) NOT NULL, dob DATE NULL,gender VARCHAR(20) NULL,country VARCHAR(20) NULL,city VARCHAR(20) NULL,profileimagePath VARCHAR(1000) NULL,coverimagePath VARCHAR(1000) NULL,visibility VARCHAR(20) NOT NULL default 'public', PRIMARY KEY     (email))",
    con.query(`CREATE TABLE IF NOT EXISTS User
    (
      email VARCHAR(150) NOT NULL,
      pswd VARCHAR(200) NOT NULL,
      fname VARCHAR(150) NOT NULL,
      lname VARCHAR(150) NOT NULL,
      bio  VARCHAR(300) NOT NULL,
      dob DATE NULL,
      gender VARCHAR(20) NULL,
      country VARCHAR(20) NULL,
      city VARCHAR(20) NULL,
      profileimagePath VARCHAR(1000) NULL,
      coverimagePath VARCHAR(1000) NULL,
      visibility VARCHAR(20) NOT NULL default 'public',
      PRIMARY KEY     (email)
    )`,function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    //con.query("CREATE TABLE Post(id INT unsigned NOT NULL AUTO_INCREMENT, postTimestamp timestamp default current_timestamp not null,imagePath VARCHAR(1000) NOT NULL, caption VARCHAR(500) NULL, userEmail VARCHAR(150) NOT NULL, PRIMARY KEY     (id),FOREIGN KEY (userEmail) REFERENCES User (email) ON UPDATE CASCADE ON DELETE CASCADE)",
    con.query(`CREATE TABLE IF NOT EXISTS Post
    (
      id          INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
      postTimestamp timestamp default current_timestamp not null,
      imagePath VARCHAR(1000) NOT NULL,
      caption VARCHAR(500) NULL,
      userEmail VARCHAR(150) NOT NULL,
      PRIMARY KEY     (id),
      FOREIGN KEY (userEmail)
      REFERENCES User (email)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    )`,function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

    
    con.query(`CREATE TABLE IF NOT EXISTS Tags(
      post_id int(10) unsigned NOT NULL,
      email VARCHAR(150) NOT NULL,
      PRIMARY KEY(post_id,email),
      FOREIGN KEY (email) REFERENCES User(email) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY(post_id) REFERENCES Post(id) ON UPDATE CASCADE ON DELETE CASCADE
    )`,function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });


    con.query(`CREATE TABLE IF NOT EXISTS Follows
    (
      email1 VARCHAR(150) NOT NULL,
      email2 VARCHAR(150) NOT NULL,
      followsTimestamp timestamp default current_timestamp NOT NULL,
      PRIMARY KEY (email1,email2),
      FOREIGN KEY (email1) REFERENCES User(email) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (email2) REFERENCES User(email) on update cascade on delete cascade
  )`,function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });


  con.query(`CREATE TABLE IF NOT EXISTS Comments(
    commentId int(10) unsigned NOT NULL AUTO_INCREMENT,
    post_id int(10) unsigned NOT NULL,
    email VARCHAR(150) NOT NULL, content varchar(4000) NOT NULL,
    commentsTimestamp timestamp default current_timestamp NOT NULL,
    PRIMARY KEY (commentId),
    FOREIGN KEY (post_id) REFERENCES Post(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (email) REFERENCES User(email) on update cascade on delete cascade
  )`,
  
  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

    con.query(`CREATE TABLE IF NOT EXISTS Likes
    (
    email VARCHAR(150) NOT NULL,
    postId INT unsigned NOT NULL,
    likesTimestamp timestamp default current_timestamp not null,
    PRIMARY KEY     (email,postId),
    FOREIGN KEY (email)
      REFERENCES User (email)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY (postId)
      REFERENCES Post (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    )`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });




module.exports = con;
