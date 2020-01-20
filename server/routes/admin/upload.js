const express = require('express');
const router = express.Router();
const uploadToken = require('../../config/qiniu');

// 七牛token
router.get('/', (req, res) => {
  const token = uploadToken;
  res.send({
    message: 'token上传成功',
    upToken: token,
  })
})

module.exports = router;