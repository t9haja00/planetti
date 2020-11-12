const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportHttp = require('passport-http');


passport.use(new passportHttp.BasicStrategy((email, oldPassword, done) => {
  db.query('SELECT * FROM users WHERE email=$1', [email])
    .then(user => {

      if (user.rows.length === 0) return done(null, false)

      const validPassword = bcrypt.compareSync(oldPassword, user.rows[0].password);
      if (!validPassword) return done(null, false);

      done(null, user.rows);
    })
})
);

// change the password
router.post('/', (req, res, next) => {
  passport.authenticate('basic', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).send('You entered wrong password.');

    const { newPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    const { user_id } = user[0];

    db.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, user_id]);

    res.sendStatus(200);

  })(req, res, next);
});

module.exports = router;