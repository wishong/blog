const express = require('express');
const router = express.Router();
const adminModel = require('../../db/models/admin');
const assert = require('http-assert');

// 登录
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  // 查找用户
  const item = await adminModel.findOne({ username });
  assert(item, 422, '用户不存在')
  // 校验密码
  const isValid = require('bcryptjs').compareSync(password, item.password);
  assert(isValid, 422, '密码错误')
  // 返回 token
  const jwt = require('jsonwebtoken');
  const id = item.id
  const token = jwt.sign({ id }, 'h6n9g0y2d6x4b4y2s3j');
  res.send({ token, username })
})

module.exports = router;