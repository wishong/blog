const mongoose = require('../mongo/db');

const categorySchema = mongoose.Schema({
  name: String
})

const stu = mongoose.model('categories', categorySchema);

module.exports = stu;