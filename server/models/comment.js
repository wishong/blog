const mongoose = require('../db/index');
const moment = require('moment');
const arctileModel = require('./article');

const commentSchema = new mongoose.Schema({
  commenter: { type: String },
  comment: { type: String },
  email: { type: String, default: '无' },
  commentTime: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') },
  articleId: { type: mongoose.SchemaTypes.ObjectId, ref: arctileModel },
  reply: { type: String, default: '' }
})

commentSchema.set('toJSON', { getters: true });

const commentModel = mongoose.model('comment', commentSchema);


module.exports = commentModel;