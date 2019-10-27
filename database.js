const sqlite3 = require('sqlite3').verbose();

const DB_NAME = 'Pixagram_db.sqlite';

const db = new sqlite3.Database(DB_NAME, (err) => {
  if (err) {
    // error opening database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    db.run(`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photoUrl text,
            caption text UNIQUE,
            user_id INTEGER,
            FOREIGN KEY (user_id)
              REFERENCES users (user_id)
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




    db.run(`CREATE TABLE users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text NOT NULL,
            fname text NOT NULL,
            lname text NOT NULL,
            email text UNIQUE,
            password text NOT NULL,
            followers INTEGER DEFAULT 0,
            following INTEGER DEFAULT 0,
            postnumber INETEGR DEFAULT 0,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
    (othererr) => {
      if (othererr) {
        // error creating table
        console.error(othererr.message);
      } else {
        // Add data to the table
        const insert = 'INSERT INTO users (username, fname, lname, email, password) VALUES (?,?,?,?,?)';
        db.run(insert, ['idamae','Ida',' Mae', 'ida@cis.upenn.edu', 'aence']);
        db.run(insert, ['gstar','George','Starling', 'gstarling@upenn.edu', 'ssss']);
        db.run(insert, ['rfoster','Rob','Foster', 'rob@upenn.edu', 'iology']);
      }
    });
  }
});


module.exports = db;
