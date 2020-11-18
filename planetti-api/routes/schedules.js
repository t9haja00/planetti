const express = require('express');
const router = express.Router();
const db = require('../db/index');
const { v4: uuidv4 } = require('uuid');

// get schedules for user
router.get('/:id', (req, res) => {
const user_id = req.params.id;

  db.query('SELECT * FROM schedules WHERE user_id=($1)',[user_id])
    .then(schedules => {
      res.send(schedules.rows);
    })
    .catch((err) => {
      console.log("get schedule error ", err);
      res.sendStatus(500);
    });
});

// create a schedule for a user
router.post('/', (req, res) => {
  console.log(req.body);
  const {title, description, user_id} = req.body;
  const uuid = uuidv4();
  const newSchedule = [
    title,
    description,
    uuid,
    user_id
  ];

      db.query('INSERT INTO schedules (title, description, uuid, user_id) VALUES ($1, $2, $3, $4) ', newSchedule)
        .then(() => res.sendStatus(201))
        .catch(err => {
          console.log('Create new schedule error ', err);
          res.sendStatus(500);
        });


});

//delete a schedule 

router.delete('/:id',  (req, res) => {
    console.log(req.params);
    const schedule_id = req.params.id;
    
    db.query('DELETE FROM schedules WHERE schedule_id=($1)', [schedule_id])
    
        .then(() => res.sendStatus(200))
        .catch(err => {
          console.log('Delete schedule error ', err);
          res.sendStatus(500);
        });

});

// edit a schedule
router.put("/:id", (req, res) => {
  console.log(req.body);
  const schedule_id = req.params.id;
  const {title, description} = req.body;
  const editSchedule  = [
    title,
    description
  ];
  console.log(editSchedule);
  db.query("SELECT * FROM schedules WHERE schedule_id=($1)", [schedule_id])
    .then(() => {
      db.query("UPDATE schedules SET title=($1), description=($2)", editSchedule);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("edit schedule error ", err);
      res.sendStatus(500);
    });
});

module.exports = router;