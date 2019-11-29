const express = require('express');
const jwt = require('jsonwebtoken');
const assert = require('http-assert');
require('express-async-error');

const app = express();
app.use(express.json());
app.use(require('cors')());
app.use('/uploads', express.static(__dirname + '/uploads'));


const categoryRouter = require('./routes/admin/category');
const articlesRouter = require('./routes/admin/article');
const uploadRouter = require('./routes/admin/upload');
const adminModel = require('./db/models/admin');
const adminRouter = require('./routes/admin/admin');
const loginRouter = require('./routes/admin/login');

// token校验中间件
app.use('/admin/api', async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop('');
  assert(token, 401, '请先登录');
  const { id } = jwt.verify(token, 'h6n9g0y2d6x4b4y2s3j');
  assert(token, 401, '请先登录');
  req.user = await adminModel.findById(id);
  assert(req.user, 401, '请先登录');
  await next();
})

app.use('/admin/login', loginRouter);
app.use('/admin/api/categories', categoryRouter);
app.use('/admin/api/articles', articlesRouter);
app.use('/admin/api/uploads', uploadRouter);
app.use('/admin/api/admins', adminRouter);

// 错误处理
app.use(async (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000..');
})