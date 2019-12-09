const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const webapp = express();

// parse application/x-www-form-urlencoded
webapp.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
webapp.use(bodyParser.json());
webapp.use('/images', express.static(path.join(__dirname, 'images')));
webapp.use('/', express.static(path.join(__dirname, 'pixagram')));

webapp.use((req, res, next) => {
  // console.log('midle:'+JSON.stringify(req.body));
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  // console.log('after:'+JSON.stringify(req.body));
  next();
});

webapp.use("/api/user", userRoutes);
webapp.use('/api/post',postRoutes);
webapp.use(express.static('backend/documentation'));

webapp.get('/swagger', function (req, res) {
res.sendFile(__dirname + 'backend/documentation/index.html');
});

webapp.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "pixagram", "index.html"))
});

module.exports = webapp;
