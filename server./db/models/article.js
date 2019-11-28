const mongoose = require('../mongo/db');
const categoryModel = require('../models/category')
const moment = require('moment');

const articleSchema = new mongoose.Schema({
  title: { type: String},
  content: { type: String },
  coverImg: { type: String },
  categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: categoryModel },
  createTime: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') },
  updateTime: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') },
},
  { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } }
)
articleSchema.set('toJSON', { getters: true })



const Articlies = mongoose.model('articles', articleSchema);

module.exports = Articlies;