var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function findAllSections() {
  return sectionModel.find();
}

function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId});
}

function findSectionById(id) {
  return sectionModel.findById(id);
}

function updateSection(id, newSection) {
  return sectionModel.update({_id: id}, {$set: newSection});
}

function deleteSection(id) {
  return sectionModel.remove({_id: id});
}

module.exports = {
  createSection: createSection,
  findAllSections: findAllSections,
  findSectionById: findSectionById,
  updateSection: updateSection,
  deleteSection: deleteSection,
  findSectionsForCourse: findSectionsForCourse
}