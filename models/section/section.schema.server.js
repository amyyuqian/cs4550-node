var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
  name: String,
  courseId: Number,
  seats: Number,
  enrolled: { type: Number, default: 0}
}, {collections: 'section'});
module.exports = sectionSchema;