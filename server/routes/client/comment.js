const express = require('express');
const router = express.Router();
const commentModel = require('../../models/comment');

// 获得评论
router.get('/:id', async (req, res) => {
  const items = await commentModel.find().populate('articleId', '_id').sort({ commentTime: -1 });
  const list = [];
  items.forEach(item => {
    if (item.articleId._id == req.params.id) {
      list.push(item);
    }
  })
  res.send(list)
})

// 新建评论
router.post('/', async (req, res) => {
  try {
    const item = await commentModel.create(req.body);
    res.send(item)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

module.exports = router;