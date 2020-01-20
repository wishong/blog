const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category');
const assert = require('http-assert');

// 获取
router.get('/', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize);
    const currentPage = parseInt(req.query.currentPage);
    const items = await categoryModel.find().limit(pageSize).skip((currentPage - 1) * pageSize);
    const total = await categoryModel.countDocuments();
    res.send({ items, total })
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 所有
router.get('/all', async (req, res) => {
  try {
    const items = await categoryModel.find();
    res.send(items)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 详情
router.get('/:id', async (req, res) => {
  try {
    const item = await categoryModel.findById(req.params.id);
    res.send(item)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

// 新建
router.post('/', async (req, res) => {
  const { name } = req.body;
  assert(name !== '', 422, '请填写分类名称');
  assert(!await categoryModel.findOne({ name }), 422, '该分类已存在,请重新命名');
  const item = await categoryModel.create(req.body);
  res.send(item)
})

// 修改
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  assert(name !== '', 422, '请填写分类名称');
  assert(!await categoryModel.findOne({ name }), 422, '该分类已存在,请重新命名');
  const item = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(item)
})

// 删除
router.delete('/delete/:id', async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.send({ state: 'success' })
  } catch (error) {
    res.status(500).send({ message: '服务器错误' });
  }
})

module.exports = router;