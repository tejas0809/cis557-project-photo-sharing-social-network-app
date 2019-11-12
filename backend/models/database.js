const sqlite3 = require('sqlite3').verbose();

const DB_NAME = 'pixagram.sqlite';

const db = new sqlite3.Database(DB_NAME, (err) => {
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


module.exports = db;
