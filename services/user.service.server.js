var userModel = require('../models/user/user.model.server');

module.exports = function (app) {
  app.post('/api/login', login);
  app.post('/api/register', register);
  app.post('/api/logout', logout);
  app.get('/api/profile', profile);
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.delete('/api/user/:userId', deleteUser);
  app.put('/api/user/:userId', updateUser);
  app.post('/api/user/username', findUserByUsername);
  app.post('/api/user/credentials', findUserByCredentials)
}

function findUserById(req, res) {
  var id = req.params['userId'];
  userModel.findUserById(id).then(function (user) {
    res.json(user);
  })
}

function findUserByUsername(req, res) {
  var username = req.body.username;
  userModel.findUserByUsername(username).then(function (user) {
    res.json(user);
  })
}

function findUserByCredentials(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  userModel.findUserByCredentials(username, password)
    .then(function(user) {
      res.json(user);
    })
}

function deleteUser(req, res) {
  var id = req.params['userId'];
  userModel.deleteUser(id).then(function (user) {
    res.json(user);
  })
}

function updateUser(req, res) {
  var id = req.params['userId'];
  userModel.updateUser(id, req.body).then(function (user) {
    res.json(user);
  })
}

function profile(req, res) {
  res.send(req.session['currentUser']);
}

function findAllUsers(req, res) {
  userModel.findAllUsers().then(function (users) {
    res.send(users);
  })
}

function register(req, res) {
  var newUser = req.body;
  
  userModel.findUserByUsername(newUser.username).then(function (user) {
    if(!user) {
      return userModel.createUser(newUser);
    }
  }).then(function (user) {
    req.session['currentUser'] = user;
    res.send(user);
  });
}

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  userModel.findUserByCredentials(username, password).then(function (user) {
    if(user) {
      req.session['currentUser'] = user;
      res.send(user);
    } else {
      res.sendStatus(422);
    }
  });
}

function logout(req, res) {
  req.session.destroy();
  res.send(200);
}

 

