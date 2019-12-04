const express = require('express');
const router = express.Router();
const categoryModel = require('../../db/models/category');

// 首页分类接口
router.get('/home', async (req, res) => {
  const items = [];
  const temp = await categoryModel.find();
  temp.forEach(item => {
    items.push(item.name)
  })
  res.send(items)

})

module.exports = router;