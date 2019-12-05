const express = require('express');
const router = express.Router();
const acticleModel = require('../../db/models/article');

// 首页最近文章接口
router.get('/home', async (req, res) => {
  const items = await acticleModel.find().sort({ createTime: -1 }).limit(5)  // 最新的文章
  res.send(items)
})

// 首页文章长度接口
router.get('/getList', async (req, res) => {
  const total = await acticleModel.find().countDocuments();
  res.send(total);
})

// 首页文章接口
router.post('/getList', async (req, res) => {
  const { pageSize, currentPage } = req.body;
  const items = await acticleModel.find().limit(pageSize).skip((currentPage - 1) * pageSize).populate('categoryId')
  res.send(items)
})

module.exports = router;


