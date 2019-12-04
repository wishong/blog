const mongoose = require('../mongo/db');

const categorySchema = new mongoose.Schema({
  name: { type: String, trim: true }
})

const CategoryModel = mongoose.model('categories', categorySchema);


module.exports = CategoryModel;