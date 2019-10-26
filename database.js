const sqlite3 = require('sqlite3').verbose();

const DB_NAME = 'pixagramdb.sqlite';

const db = new sqlite3.Database(DB_NAME, (err) => {
  if (err) {
    // error opening database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE post (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photoUrl text, 
            caption text UNIQUE, 
            userid INTEGER,
            FOREIGN KEY (userid)
              REFERENCES user (userid)
              ON UPDATE CASCADE
              ON DELETE CASCADE
            )`,
    (othererr) => {
      if (othererr) {
        
        console.error(othererr.message);
      } else {
        

      }
    });
  }
});


