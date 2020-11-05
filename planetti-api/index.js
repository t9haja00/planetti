const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


console.log('Database connection is opened successfully!');
app.listen(PORT, () => console.log(`Server is up and listening on ${PORT}...`));



/*API test (to start the server type "npm run dev")
-----------*/
const test = require('./routes/test');
app.use('/test', test);