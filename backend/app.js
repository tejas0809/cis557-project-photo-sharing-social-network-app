const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const db = require('./models/database.js');

const webapp = express();

webapp.use(bodyParser.json());

webapp.use(bodyParser.urlencoded({
  extended: true,
}));

webapp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

webapp.use("/api/user", userRoutes);

module.exports = webapp;
