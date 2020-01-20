const express = require('express');
const jwt = require('jsonwebtoken');
const assert = require('http-assert');
require('express-async-error');

const app = express();
app.use(express.json());
app.use(require('cors')());

const categoryRouterAdmin = require('./routes/admin/category');
const articlesRouterAdmin = require('./routes/admin/article');
const uploadRouterAdmin = require('./routes/admin/upload');
const adminRouterAdmin = require('./routes/admin/admin');
const loginRouterAdmin = require('./routes/admin/login');

const adminModelAdmin = require('./models/admin');
// token校验中间件
app.use('/admin/api', async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop('');
  assert(token, 401, '请先登录');
  const { id } = jwt.verify(token, 'h6n9g0y2d6x4b4y2s3j');
  assert(token, 401, '请先登录');
  req.user = await adminModelAdmin.findById(id);
  assert(req.user, 401, '请先登录');
  await next();
})

// 后台接口
app.use('/admin/login', loginRouterAdmin);
app.use('/admin/api/upload', uploadRouterAdmin);
app.use('/admin/api/categories', categoryRouterAdmin);
app.use('/admin/api/articles', articlesRouterAdmin);
app.use('/admin/api/admins', adminRouterAdmin);

const categoryRouterClient = require('./routes/client/category');
const articlesRouterClient = require('./routes/client/article');
const commentRouterClient = require('./routes/client/comment');

// 前端接口
app.use('/client/api/categories', categoryRouterClient);
app.use('/client/api/articles', articlesRouterClient);
app.use('/client/api/comments', commentRouterClient);


// 错误处理
app.use(async (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000..');
})