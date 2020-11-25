const cors = require('cors');
const express = require('express');

const users = require('./routes/users');
const auth = require('./routes/auth');
const changePassword = require('./routes/changePassword');
const schedules = require('./routes/schedules');
const eventsOld = require('./routes/events-old');
const events = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/auth', auth);
app.use('/:uuid?/schedules',schedules);
app.use('/users/changePassword', changePassword);
app.use('/:uuid?/events-old/', eventsOld);
app.use('/events', events);



console.log('Database connection is opened successfully!');
app.listen(PORT, () => console.log(`Server is up and listening on ${PORT}...`));



/*API test (to start the server type "npm run dev")
-----------*/
const test = require('./routes/test');
app.use('/test', test);