require('dotenv').config();
const express = require('express');
const homeRoute = require('./routes');

const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

//const homeRoute = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
//const contactsRoutes = require('./routes/contacts');



//app.use('/', homeRoute);
app.use(express.json());

// Middleware to parse JSON requests
app.use(bodyParser.json());


// Use the contacts routes
//app.use('/', contactsRoutes);

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`, req.body);
//   next();
// });

// app
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   })
//   .use('/', require('./routes'));
// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Mount routes
app.use('/', homeRoute);

// mongodb.initDb((err, db) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(PORT);
//     console.log(`Connected to DB and listening on ${PORT}`);
//   }
// });
// Database Initialization and Server Start
mongodb.initDb((err, db) => {
    if (err) {
      console.error('Database connection failed:', err);
      process.exit(1); // Exit if the database connection fails
    } else {
      app.listen(PORT, () => {
        console.log(`Connected to DB and server is running on http://localhost:${PORT}`);
      });
    }
  });