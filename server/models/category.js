const mongoose = require('../db/index');

const categorySchema = new mongoose.Schema({
  name: { type: String, trim: true }
})

const categoryModel = mongoose.model('categories', categorySchema);


module.exports = categoryModel;