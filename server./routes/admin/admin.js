const express = require('express');
const router = express.Router();
const adminModel = require('../../db/models/admin');

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const item = await adminModel.findOne({ username });
  if (!item) {
    res.status(422).send({
      message: '用户不存在'
    })
  }
})

// 获取管理员列表
router.get('/', async (req, res) => {
  const items = await adminModel.find();
  res.send(items);
});

// 新建管理员
router.post('/', async (req, res) => {
  const item = await adminModel.create(req.body);
  res.send(item);
})

module.exports = router;