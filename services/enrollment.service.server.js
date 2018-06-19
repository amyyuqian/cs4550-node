var enrollmentModel = require('../models/enrollment/enrollment.model.server');
var sectionModel = require('../models/section/section.model.server')

module.exports = function (app) {
  app.post('/api/section/:sid/enrollment', enroll),
  app.get('/api/student/section', getAllSectionsForStudent),
  app.delete('/api/section/:sid/enrollment/:eid', unenroll)
}

function enroll(req, res) {
  var currentUser = req.session.currentUser;
  var sectionId = req.params['sid'];

  var body = {
    sectionId: sectionId,
    studentId: currentUser._id,
  }
  var section = sectionModel.findSectionById(sectionId);
  var newSeats = section.seats + 1;
  var updateSection = {
    enrolled: newSeats,
  }
  enrollmentModel.createEnrollment(body).then(function(enrollment) {
    sectionModel.updateSection(sectionId, updateSection)
    res.send(enrollment);
  })

}

function getAllSectionsForStudent(req, res) {
  var currentUser = req.session.currentUser;
  var studentId = currentUser._id;
  enrollmentModel.getEnrollments(studentId).then(function(enrollments) {
    res.send(enrollments);
  })
}

function unenroll(req, res) {
  var eid = req.params['eid'];
  var sid = req.params['sid'];
  var section = sectionModel.findSectionById(sid);
  var newSeats = section.seats - 1;
  var updateSection = {
    enrolled: newSeats,
  }
  enrollmentModel.deleteEnrollment(eid).then(function (enrollment) {
    sectionModel.updateSection(sid, updateSection);
    res.json(enrollment);
  })


}