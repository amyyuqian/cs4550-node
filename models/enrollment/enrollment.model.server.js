var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function createEnrollment(enrollment) {
  return enrollmentModel.create(enrollment);
}

function getEnrollments(studentId) {
  return enrollmentModel.find({studentId: studentId});
}

function deleteEnrollment(id) {
  return enrollmentModel.remove({_id: id});
}

module.exports = {
  createEnrollment: createEnrollment,
  getEnrollments: getEnrollments,
  deleteEnrollment: deleteEnrollment
}