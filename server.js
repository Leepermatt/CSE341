require('dotenv').config();
const express = require('express');
const homeRoute = require('./routes');

//const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 3000;
const contactsRoutes = require('./routes/contacts');



app.use('/', homeRoute);

// Middleware to parse JSON requests
//app.use(bodyParser.json());

// Use the contacts routes
app.use('/contacts', contactsRoutes);



mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to DB and listening on ${PORT}`);
  }
});