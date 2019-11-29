const express = require('express');
const router = express.Router();
const acticleModel = require('../../db/models/article');

// 获取文章列表
router.get('/', async (req, res) => {
  const items = await acticleModel.find().populate('categoryId').limit(10);
  res.send(items);
});

// 详情查询
router.get('/:id', async (req, res) => {
  const item = await acticleModel.findById(req.params.id);
  res.send(item)
})

// 新建文章
router.post('/', async (req, res) => {
  const item = await acticleModel.create(req.body);
  res.send(item);
})

// 文章修改
router.put('/:id', async (req, res) => {
  const item = await acticleModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(item)
})

//  文章删除
router.delete('/delete/:id', async (req, res) => {
  await acticleModel.findByIdAndDelete(req.params.id);
  res.send({
    state: 'success '
  })
})

module.exports = router;


