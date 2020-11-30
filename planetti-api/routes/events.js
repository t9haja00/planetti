const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.post('/', (req, res) => {

  const { schedule_id } = req.body.params;
  const { action, added, changed, deleted, key } = req.body;

  db.query("SELECT * FROM events WHERE schedule_id=($1)", [schedule_id])
    .then(({ rows }) => {
      const eventsArr = rows.map(e => e.event);

      if (!action) return res.send(eventsArr);

      if (action === 'insert' ||
        (action == 'batch' && added.length > 0)) {

        const value = (action === 'insert') ?
          value : added[0];

        const startTime = new Date(value.StartTime);
        const endTime = new Date(value.EndTime);

        const maxId = rows.length > 0 ?
          rows.reduce((acc, row) =>
            Math.max(acc, row.event.Id), 0) : 0;

        const newEvent = {
          Id: maxId + 1,
          StartTime: startTime,
          EndTime: endTime,
          Subject: value.Subject,
          Location: value.Location,
          Description: value.Description,
          IsAllDay: value.IsAllDay,
          StartTimeZone: value.StartTimezone,
          EndTimeZone: value.EndTimezone,
          RecurrenceRule: value.RecurrenceRule,
          RecurrenceID: value.RecurrenceID,
          RecurrenceException: value.RecurrenceException,
          FollowingID: value.FollowingID,
          IsReadonly: value.IsReadonly,
          IsBlock: value.IsBlock,
        }

        userDefined.call(newEvent, value);

        db.query("INSERT INTO events (event, schedule_id) VALUES ($1, $2)", [newEvent, schedule_id])
          .then(_ => res.send(newEvent))
          .catch(err => res.sendStatus(500));
      }

      if (action === 'update' ||
        (action === 'batch' && changed.length > 0)) {

        const value = (action === 'update') ?
          value : changed[0];

        const filterData = rows.filter(r => r.event.Id === value.Id);

        const { event_id, event } = filterData[0];

        if (filterData.length > 0) {
          const startTime = new Date(value.StartTime);
          const endTime = new Date(value.EndTime);

          event.StartTime = startTime,
            event.EndTime = endTime,
            event.Subject = value.Subject,
            event.Location = value.Location,
            event.Description = value.Description,
            event.IsAllDay = value.IsAllDay,
            event.StartTimeZone = value.StartTimezone,
            event.EndTimeZone = value.EndTimezone,
            event.RecurrenceRule = value.RecurrenceRule,
            event.RecurrenceID = value.RecurrenceID,
            event.RecurrenceException = value.RecurrenceException
        }

        userDefined.call(event, value);

        db.query("UPDATE events SET event=($1) WHERE event_id=($2)", [
          event,
          event_id,
        ])
          .then(_ => res.send(event))
          .catch(err => res.sendStatus(500));
      }

      if (action == "remove" || (action == "batch" && deleted.length > 0)) {

        if (action == "remove") {
          const filterData = rows.find(r => r.event.Id === key);
          const { event_id } = filterData;

          db.query("DELETE FROM events WHERE event_id=($1)", [event_id])
            .then(_ => res.send(filterData))
            .catch((err) => {
              res.sendStatus(500);
            });
        }
        else {
          for (let event of deleted) {
            const filterData = rows.find(r => r.event.Id === event.Id);
            const { event_id } = filterData;

            db.query("DELETE FROM events WHERE event_id=($1)", [event_id])
              .then(_ => res.send(filterData))
              .catch((err) => {
                res.sendStatus(500);
              });
          }
        }
      }

    })
    .catch(e => res.sendStatus(500));
});

// add user defined fields
function userDefined(value) {
  for (let key in value) {
    if (key !== 'StartTime' || key !== 'EndTime')
      this[key] = value[key];
  }
}

module.exports = router;
