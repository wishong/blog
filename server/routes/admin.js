const express = require('express');
const router = express.Router();
const categories = require('../db/models/category');

// 获取分类
router.get('/categories', async (req, res) => {
  const items = await categories.find().limit(10);
  res.send(items);
})

// 新建分类
router.post('/categories', async (req, res) => {
  const item = await categories.create(req.body);
  res.send(item)
})

// 分类详情查询
router.get('/categories/:id', async (req, res) => {
  const item = await categories.findById(req.params.id);
  res.send(item)
})

// 分类详情修改
router.put('/categories/:id', async (req, res) => {
  const item = await categories.findByIdAndUpdate(req.params.id, req.body);
  res.send(item)
  console.log(item);
})

module.exports = router;