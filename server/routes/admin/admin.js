const express = require('express');
const router = express.Router();
const adminModel = require('../../models/admin');
const assert = require('http-assert');

// 获取
router.get('/', async (req, res) => {
  try {
    const items = await adminModel.find();
    res.send(items);
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
});

// 新建
router.post('/', async (req, res) => {
  const { username } = req.body;
  assert(!await adminModel.findOne({ username }), 422, '该用户已存在,请重新命名')
  const item = await adminModel.create(req.body);
  res.send(item)
})

// 删除
router.delete('/delete/:id', async (req, res) => {
  try {
    await adminModel.findByIdAndDelete(req.params.id);
    res.send({ state: 'success' })
  } catch (error) {
    res.status(500).send({ message: '服务器错误' })
  }
})

// 修改密码
router.put('/changePwd/:username', async (req, res) => {
  const { oldpwd, password } = req.body;
  const { username } = req.params;
  const item = await adminModel.findOne({ username });
  const isValid = require('bcryptjs').compareSync(oldpwd, item.password);
  assert(isValid, 422, '旧密码错误');
  const isRepeat = require('bcryptjs').compareSync(password, item.password);
  assert(!isRepeat, 422, '新旧密码一样');
  const result = await adminModel.updateOne({ username }, { password });
  res.send(result);
})

module.exports = router;