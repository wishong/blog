const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('open', () => {
  console.log('数据库连接成功');
})
db.on('error', () => {
  console.log('数据库连接失败！');
});
db.on('close', () => {
  console.log('数据库断开连接');
})

module.exports = mongoose