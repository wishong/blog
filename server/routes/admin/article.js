const express = require('express');
const router = express.Router();
const articleModel = require('../../models/article');
const commentModel = require('../../models/comment');

// 获取
router.get('/', async (req, res) => {
  try {
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);
    const items = await articleModel.find().populate('categoryId').limit(pageSize).skip((currentPage - 1) * pageSize);
    const total = await articleModel.countDocuments();
    res.send({ items, total });
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
});

// 详情
router.get('/detail/:id', async (req, res) => {
  try {
    const item = await articleModel.findById(req.params.id);
    res.send(item)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 新建
router.post('/', async (req, res) => {
  try {
    const item = await articleModel.create(req.body);
    res.send(item);
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 修改
router.put('/edit/:id', async (req, res) => {
  try {
    const item = await articleModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(item)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 删除
router.delete('/delete/:id', async (req, res) => {
  try {
    await commentModel.deleteMany({ articleId: req.params.id }).populate('articleId');
    await articleModel.findByIdAndDelete(req.params.id);
    res.send({ state: 'success ' });
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 文章评论
router.get('/comments/:id', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize);
    const currentPage = parseInt(req.query.currentPage);
    const items = await commentModel.find().populate('articleId');
    const temp = [];
    items.forEach(item => {
      if (item.articleId._id == req.params.id) {
        temp.push(item);
      }
    })
    const total = temp.length;
    const list = temp.splice((currentPage - 1) * pageSize, pageSize)
    res.send({ list, total });
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 删评
router.delete('/comments/:id', async (req, res) => {
  try {
    await commentModel.findByIdAndDelete(req.params.id);
    res.send({ state: 'success ' });
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 评论详情
router.get('/comment/:id', async (req, res) => {
  try {
    const item = await commentModel.findById(req.params.id);
    res.send(item)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 回复
router.put('/comment/:id', async (req, res) => {
  try {
    const item = await commentModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(item);
  } catch (error) {
     res.status(500).send({ message: '服务器错误' });
  }
})

module.exports = router;


