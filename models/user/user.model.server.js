var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
  return userModel.findById(userId);
 }
function findUserByUsername(username) {
  return userModel.findOne({username: username}); 
 }
function findUserByCredentials(username, password) {
  return userModel.findOne({
    username: username, password: password
  });
 }

function findAllUsers() {
  return userModel.find();
}

function createUser(user) { 
  return userModel.create(user);
}
function deleteUser(userId) {
  return userModel.remove({_id: userId});
 }
function updateUser(userId, newUser) {
  return userModel.update({_id: userId}, {$set: newUser})
 }

module.exports = {
  findUserById: findUserById,
  findUserByUsername: findUserByUsername,
  findUserByCredentials: findUserByCredentials,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  findAllUsers: findAllUsers
 };
 