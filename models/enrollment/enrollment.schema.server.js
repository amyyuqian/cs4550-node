var mongoose = require('mongoose');
var enrollmentSchema = mongoose.Schema({
  studentId: String,
  sectionId: String,
  grade: String
}, {collections: 'enrollment'});
module.exports = enrollmentSchema;