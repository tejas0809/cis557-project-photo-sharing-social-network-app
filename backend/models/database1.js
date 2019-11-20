//const sqlite3 = require('sqlite3').verbose();
var mysql = require('mysql');

const DB_NAME = 'pixagramk';
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'kanika123', 
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
/*const db = new sqlite3.Database(DB_NAME, (err) => {
  if (err) {
    // error opening database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    db.run(`CREATE TABLE users (
            email text UNIQUE,
            password text NOT NULL,
            fname text NOT NULL,
            lname text NOT NULL,
            dob text,
            gender text,
            country text,
            city text,
            bio text,
            profileimagepath text,
            coverimagepath text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
    (othererr) => {
      if (othererr) {
        // error creating table
        console.error(othererr.message);
      } else {
        // Add data to the table
        // const insert = 'INSERT INTO users (username, fname, lname, email, password) VALUES (?,?,?,?,?)';
        // db.run(insert, ['idamae','Ida',' Mae', 'ida@cis.upenn.edu', 'aence']);
        // db.run(insert, ['gstar','George','Starling', 'gstarling@upenn.edu', 'ssss']);
        // db.run(insert, ['rfoster','Rob','Foster', 'rob@upenn.edu', 'iology']);
      }
    });

    db.run(`CREATE TABLE posts (
            postId INTEGER PRIMARY KEY AUTOINCREMENT,
            imagePath text NOT NULL,
            caption text,
            email text NOT NULL,
            FOREIGN KEY (email)
              REFERENCES users (email)
              ON UPDATE CASCADE
              ON DELETE CASCADE
            )`,
    (othererr) => {
      if (othererr) {
        console.error(othererr.message);
      } else {
        console.log("posts table ");
      }
    });
  }
});

db.run(`CREATE TABLE likes (
  postId INTEGER PRIMARY KEY AUTOINCREMENT,
  email text NOT NULL,
  FOREIGN KEY (email)
    REFERENCES users (email)
    
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (postId)
    REFERENCES posts (postId)
    
    ON UPDATE CASCADE
    ON DELETE CASCADE
  )`,
(othererr) => {
if (othererr) {
console.error(othererr.message);
} else {
console.log("posts table ");
}
});
}
});*/



module.exports = con;
