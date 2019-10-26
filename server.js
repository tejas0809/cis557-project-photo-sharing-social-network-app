const express = require('express');

const webapp = express();
const bodyParser = require('body-parser');
const db = require('./database.js');

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
  const sql = 'select * from post where userid = ?';
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