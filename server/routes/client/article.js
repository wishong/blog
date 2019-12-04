const express = require('express');
const router = express.Router();
const acticleModel = require('../../db/models/article');

// 首页最近文章接口
router.get('/home', async (req, res) => {
  const items = await acticleModel.find().sort({ createTime: -1 }).limit(5)  // 最新的文章
  res.send(items)
})

// 首页文章接口
router.post('/getList', async (req, res) => {
  const items = await acticleModel.find()
  res.send(items)
})

module.exports = router;


