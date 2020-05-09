const express = require('express');
const router = express.Router();
const articleModel = require('../../models/article');

// 所有
router.get('/', async (req, res) => {
  try {
    const items = await articleModel.find().populate('categoryId');
    res.send(items);
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

// 获得
router.get('/pagination', async (req, res) => {
  try {
    const total = await articleModel.find().countDocuments();
    const pageSize = parseInt(req.query.pageSize);
    const currentPage = parseInt(req.query.currentPage);
    const items = await articleModel.find().sort({ createTime: -1 }).limit(pageSize).skip((currentPage - 1) * pageSize).populate('categoryId')
    res.send({ total, items })
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

// 最近
router.get('/edit', async (req, res) => {
  try {
    const items = await articleModel.find().sort({ updateTime: -1 }).limit(5);
    res.send(items);
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

// 详情
router.get('/detail/:id', async (req, res) => {
  try {
    const item = await articleModel.findById(req.params.id).populate('categoryId');
    const prev = await articleModel.find({ createTime: { $lt: item.createTime } }).sort({ createTime: -1 }).limit(1);
    const next = await articleModel.find({ createTime: { $gt: item.createTime } }).sort({ createTime: 1 }).skip(1).limit(1);
    res.send({ item, prev, next })
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

// 分类文章
router.get('/category/:name', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize);
    const currentPage = parseInt(req.query.currentPage);
    const items = await articleModel.find().populate('categoryId', 'name');
    const temp = [];
    items.forEach(item => {
      if (item.categoryId.name === req.params.name) {
        temp.push(item)
      }
    })
    const total = temp.length;
    const list = temp.splice((currentPage - 1) * pageSize, pageSize)
    res.send({ total, list });
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

// 搜索
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const items = await articleModel.find({
      $or: [
        { title: { $regex: keyword } },
        { describe: { $regex: keyword } },
        { content: { $regex: keyword } }
      ]
    })
    res.send(items)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

module.exports = router;


