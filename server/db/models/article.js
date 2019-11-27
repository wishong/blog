const mongoose = require('../mongo/db');
const categoryModel = require('../models/category')

const articleSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: categoryModel }
})

const Articlies = mongoose.model('articles', articleSchema);

module.exports = Articlies;