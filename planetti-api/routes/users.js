const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');


// get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT user_id, name, email FROM users WHERE user_id = $1 ', [id])
    .then(user => {
      if (user.rows.length > 0) {
        console.log(user.rows);
        const { user_id, name, email } = user.rows[0];
        const userInfo = {
          user_id,
          name,
          email
        }

        res.send(userInfo)
      }
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

// register a user 
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = [
    name,
    email,
    hashedPassword,
  ];

  db.query('SELECT email FROM users WHERE email= $1 ', [email])
    .then(email => {
      if (email.rows.length > 0) return res.status(400).send('Email already exists');

      db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ', newUser)
        .then(() => res.sendStatus(201))
        .catch(err => {
          res.sendStatus(500);
        });
    })
    .catch(err => {
      res.sendStatus(500)
    });
});

// change user name and email
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  db.query('SELECT email FROM users WHERE email= $1 AND user_id <> $2 ', [email, id])
    .then(result => {
      if (result.rows.length > 0) return res.status(400).send('Email already exists, Please choose different email');

      db.query('UPDATE users SET name = $1, email = $2 WHERE user_id = $3 ', [name, email, id])
        .then(result=> {
          res.sendStatus(201);
        })
        .catch(err => {
          res.sendStatus(500);
        })
    })
    .catch(err => {
      res.sendStatus(500)
    });

});

// Delete user account
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE user_id = $1 ', [id])
  .then(result => {
    res.send(200);
  })
  .catch(err => {
    res.sendStatus(500);
  })

})

module.exports = router;