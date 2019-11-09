const express = require("express");
const router = express.Router();

router.get('', (req, res) => {
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



router.get('/:id', (req, res) => {
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

module.exports = router;
