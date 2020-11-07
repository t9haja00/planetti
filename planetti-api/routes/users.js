const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');

// get users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users')
    .then(users => {
      res.send(users);
    })
});

// register a user 
router.post('/', (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = [
    name,
    email,
    hashedPassword,
  ];

  db.query('SELECT email FROM users WHERE email= $1', [email])
    .then(email => {
      if (email.rows.length > 0) return res.status(400).send('Email already exists');

      db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ', newUser)
        .then(() => res.sendStatus(201))
        .catch(err => {
          console.log('Register Error', err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log('Email exists ', err);
      res.sendStatus(500)
    });
});

module.exports = router;