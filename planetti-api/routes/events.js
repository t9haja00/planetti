const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../db/index");

// get events for schedule by schedule id

router.get("/:id", (req, res) => {
  const schedule_id = req.params.id;
console.log("selecting by id..");
  db.query("SELECT * FROM events WHERE schedule_id=($1)", [schedule_id]).then(
    (events) => {
      res.send(events.rows);
    }
  );
});

// get events for schedule by schedule uuid

router.get("/", (req, res) => {
  const schedule_uuid = req.params.uuid;
console.log("selecting by uuid. " + schedule_uuid);
  db.query("SELECT schedule_id FROM schedules WHERE uuid=($1)", [
    schedule_uuid,])
    .then((schedule) => {
    const schedule_id = (schedule.rows[0].schedule_id);
    db.query("SELECT * FROM events WHERE schedule_id=($1)", [schedule_id]).then(
      (events) => {
        res.send(events.rows);
      }
    );
  });
});

// create an event for a schedule

router.post("/", (req, res) => {
  const eventObject = req.body.event;
  const schedule_id = req.body.schedule_id;

  const newEvent = [eventObject, schedule_id];
  console.log(newEvent);

  db.query("INSERT INTO events (event, schedule_id) VALUES ($1, $2)", newEvent)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Create new event error ", err);
      res.sendStatus(500);
    });
});

//delete an event

router.delete("/:id", (req, res) => {
  console.log(req.params);
  const event_id = req.params.id;

  db.query("DELETE FROM events WHERE event_id=($1)", [event_id])

    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Delete event error ", err);
      res.sendStatus(500);
    });
});

// edit an event object
router.put("/:id", (req, res) => {
  const event_id = req.params.id;
  const editEvent = req.body;
  console.log(editEvent);
  db.query("SELECT event FROM events WHERE event_id=($1)", [event_id])
    .then(() => {
      db.query("UPDATE events SET event=($1)", [editEvent]);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("edit event error ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
