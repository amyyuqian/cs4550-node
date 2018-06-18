var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
var userService = require("./services/user.service.server");
var idleTimeoutSeconds = 1800;

mongoose.connect(
  "mongodb://heroku_sz86kh8d:3pl68eheog1ip31547bam8fa3q@ds259210.mlab.com:59210/heroku_sz86kh8d"
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "shhh, dont tell anyone",
    cookie: {
      maxAge: idleTimeoutSeconds * 1000
    },
    rolling: true
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", function(req, res) {
  res.send("Hello World");
});

userService(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
