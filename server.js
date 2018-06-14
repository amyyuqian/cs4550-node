var express = require('express');
var app = express();
var session = require('express-session')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var userService = require('./services/user.service.server');

mongoose.connect('mongodb://localhost/cs4550-node');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(session({
 resave: false, 
 saveUninitialized: true,
 secret: 'shhh, dont tell anyone'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World')
})

userService(app);

app.listen(4000);