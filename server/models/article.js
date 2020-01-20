const mongoose = require('../db/index');
const moment = require('moment');
const categoryModel = require('../models/category');

const articleSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  coverImg: { type: String },
  describe: { type: String },
  createTime: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') },
  updateTime: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') },
  categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: categoryModel },
},
  { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } }
)

articleSchema.set('toJSON', { getters: true });

const articlies = mongoose.model('articles', articleSchema);

module.exports = articlies;