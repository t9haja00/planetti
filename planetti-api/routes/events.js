const express = require('express');
const router = express.Router();
const db = require('../db/index');
const { v4: uuidv4 } = require('uuid');

// get events for schedule
router.get('/:id', (req, res) => {
const schedule_id = req.params.id;

  db.query('SELECT * FROM events WHERE schedule_id=($1)',[schedule_id])
    .then(events => {
      res.send(events.rows);
    })
});

// create an event for a schedule
router.post('/', (req, res) => {
  console.log(req.body);
  const {eventObject} = req.body;
  const newEvent = [
    eventObject,
    schedule_id
  ];

      db.query('INSERT INTO schedules (event, schedule_id) VALUES ($1, $2)', newEvent)
        .then(() => res.sendStatus(201))
        .catch(err => {
          console.log('Create new event error ', err);
          res.sendStatus(500);
        });


});

//delete an event

router.delete('/:id',  (req, res) => {
    console.log(req.params);
    const event_id = req.params.id;
    
    db.query('DELETE FROM events WHERE schedule_id=($1)', [event_id])
    
        .then(() => res.sendStatus(200))
        .catch(err => {
          console.log('Delete event error ', err);
          res.sendStatus(500);
        });

});

module.exports = router;