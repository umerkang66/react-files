// Dependency imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// My module imports
const router = require('./router');
const { mongoConnectionString } = require('./config');

// APP SETUP
const app = express();

// Logging middleware: It logs about req methods
app.use(morgan('dev'));
// Express.json parse the incoming requests into "json"
app.use(express.json());

// Enables the request to reach the server from applications from other domains like react application
// This security process is implemented in the sole browser only, that's why if we send request from postman, the request passes (whether cors allow it or not)
app.use(cors({ origin: 'http://localhost:3000' }));

// Sending the router module app object by passing into the router function
router(app);

// DB Setup
mongoose.connect(mongoConnectionString, err => {
  if (err) return console.error(err.message);
  console.log('Connected the mongodb database');
});

// SERVER SETUP
const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
