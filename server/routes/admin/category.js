const express = require('express');
const router = express.Router();
const categoryModel = require('../../db/models/category');
const assert = require('http-assert');

// 获取分类列表
router.get('/', async (req, res) => {
  const items = await categoryModel.find().limit(10);
  res.send(items);
})

// 详情查询
router.get('/:id', async (req, res) => {
  const item = await categoryModel.findById(req.params.id);
  res.send(item)
})

// 新建分类
router.post('/', async (req, res) => {
  const { name } = req.body;
  assert(name !== '', 422, '请填写分类名称');
  assert(!await categoryModel.findOne({ name }), 422, '该分类已存在,请重新命名');
  const item = await categoryModel.create(req.body);
  res.send(item)
})

// 分类详情修改
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  assert(name !== '', 422, '请填写分类名称');
  assert(!await categoryModel.findOne({ name }), 422, '该分类已存在,请重新命名');
  const item = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(item)
})

// 分类删除
router.delete('/delete/:id', async (req, res) => {
  await categoryModel.findByIdAndDelete(req.params.id);
  res.send({
    state: 'success'
  })
})

module.exports = router;