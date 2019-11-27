const mongoose = require('../mongo/db');

const categorySchema = mongoose.Schema({
  name: { type: String }
})

const CategoryModel = mongoose.model('categories', categorySchema);


module.exports = CategoryModel;