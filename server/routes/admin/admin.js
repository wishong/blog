const express = require('express');
const router = express.Router();
const adminModel = require('../../db/models/admin');

// 获取管理员列表
router.get('/', async (req, res) => {
  const items = await adminModel.find();
  res.send(items);
});

// 新建管理员
router.post('/', async (req, res) => {
  const { username } = req.body;
  if (typeof (username) === 'undefined') {
    res.status(422).send({ message: '请填写登录名' })
  }
  else if (await adminModel.findOne({ username })) {
    res.status(422).send({ message: '该用户已存在,请重新命名' })
  } else {
    const item = await adminModel.create(req.body);
    res.send(item)
  }
})

//  文章删除
router.delete('/delete/:id', async (req, res) => {
  await adminModel.findByIdAndDelete(req.params.id);
  res.send({
    state: 'success'
  })
})

module.exports = router;