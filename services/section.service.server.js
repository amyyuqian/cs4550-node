var sectionModel = require('../models/section/section.model.server');
var enrollmentModel = require('../models/enrollment/enrollment.model.server');

module.exports = function (app) {
  app.post('/api/course/:courseId/section', createSection),
  app.get('/api/course/:courseId/section', getAllSectionsForCourse),
  app.get('/api/section/:sectionId', getSectionById),
  app.put('/api/section/:sectionId', updateSection),
  app.delete('/api/section/:sectionId', deleteSection)
}

function createSection(req, res) {
  var newSection = req.body;
  sectionModel.createSection(newSection).then(function(section) {
    res.send(section);
  })
}

function getAllSectionsForCourse(req, res) {
  var cid = req.params['courseId'];
  sectionModel.findSectionsForCourse(cid).then(function(sections) {
    res.send(sections);
  })
}

function getSectionById(req, res) {
  var sid = req.params['sectionId'];
  sectionModel.findSectionById(sid).then(function(section) {
    res.send(section);
  })
}

function updateSection(req, res) {
  var sid = req.params['sectionId'];
  var newSection = req.body;
  sectionModel.updateSection(sid, newSection).then(function(section) {
    res.send(section);
  })
}

function deleteSection(req, res) {
  var sid = req.params['sectionId'];
  var enrollments = enrollmentModel.getEnrollmentsBySection(sid);
  
  sectionModel.deleteSection(sid).then(function(section) {
    enrollments.map((enrollment) => {
      enrollmentModel.deleteEnrollment(enrollment._id)
    })
    res.send(section);
  })
}