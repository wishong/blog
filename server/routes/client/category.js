const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category');

// 分类
router.get('/', async (req, res) => {
  try {
    const items = [];
    const temp = await categoryModel.find();
    temp.forEach(item => {
      items.push(item.name)
    })
    res.send(items)
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

module.exports = router;