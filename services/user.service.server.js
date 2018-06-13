import userModel from '../models/user.model.server';

export default function (app) {
  app.post('/api/login', login);
  app.post('/api/register', register);
  app.post('/api/logout', logout);
  app.get('/api/profile', profile);
}

function register(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var newUser = {
    username: username,
    password: password
  };
  
  userModel.findUserByUsername(username).then(function (user) {
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
      res.send(0);
    }
  });
}

function logout(req, res) {
  req.session.destroy();
  res.send(200);
}

 

