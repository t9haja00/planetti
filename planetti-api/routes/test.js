const express = require('express');
const router = express.Router();
const db = require('../db/index');

// get all users from database
router.get('/', (req, res) => {
  db.query('SELECT * FROM users')
    .then(test => {
      res.send(test.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;