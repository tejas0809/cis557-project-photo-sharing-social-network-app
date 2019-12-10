var mysql = require('mysql');

const DB_NAME = 'heroku_483e5a4ccee191b';
var db_config = {
  host: 'us-cdbr-iron-east-05.cleardb.net',
  port: '3306',
  user:'bf53c8f3c155e4',
  password: '83da8fed',
  database: DB_NAME
};
var con;
function handleDisconnect() {
  con = mysql.createConnection(db_config);
  con.connect(function(err) {
    if (err) setTimeout(handleDisconnect, 2000);
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
      profileImagePath VARCHAR(1500) default '/images/def_Profile.jpg',
      coverImagePath VARCHAR(1500) default '/images/def_Cover.jpg',
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
      REFERENCES users (email)
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
      FOREIGN KEY (email) REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY(post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
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
      FOREIGN KEY (email1) REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (email2) REFERENCES users(email) on update cascade on delete cascade
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
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (email) REFERENCES users(email) on update cascade on delete cascade
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
      REFERENCES users (email)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY (postId)
      REFERENCES posts (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    )`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  con.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

handleDisconnect();
module.exports = con;
