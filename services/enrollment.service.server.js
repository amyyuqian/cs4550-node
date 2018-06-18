var enrollmentModel = require('../models/enrollment/enrollment.model.server');
var sectionModel = require('../models/section/section.model.server')

module.exports = function (app) {
  app.post('/api/student/:sid/section/:kid', enroll),
  app.get('/api/student/:sid/section', getAllSectionsForStudent),
  app.delete('/api/student/:sid/section/:kid/enrollment/:eid', unenroll)
}

function enroll(req, res) {
  var studentId = req.params['sid'];
  var sectionId = req.params['kid'];
  var body = {
    studentId: studentId,
    sectionId: sectionId,
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
  var studentId = req.params['sid'];
  enrollmentModel.getEnrollments(studentId).then(function(enrollments) {
    res.send(enrollments);
  })
}

function unenroll(req, res) {
  var eid = req.params['eid'];
  var sid = req.params['kid'];
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