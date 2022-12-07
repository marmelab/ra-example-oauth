const express = require('express');
const cors = require('cors');

const app = express();

const resource = require('./routes/resource');
const auth = require('./routes/auth');

app.use(
  express.json({
    limit: '10mb'
  })
);

app.use(
  express.urlencoded({
    limit: '10mb',
    extended: true
  })
);

app.use(cors());
app.use(auth, resource);

module.exports = app;