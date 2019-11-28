const express = require('express');

const app = express();
app.use(express.json());
app.use(require('cors')());
app.use('/uploads', express.static(__dirname + '/uploads'));

const categoryRouter = require('./routes/admin/category');
const articlesRouter = require('./routes/admin/article');
const uploadRouter = require('./routes/admin/upload');
const adminRouter = require('./routes/admin/admin');

app.use('/admin/api/categories', categoryRouter);
app.use('/admin/api/articles', articlesRouter);
app.use('/admin/api/uploads', uploadRouter);
app.use('/admin/api/admins', adminRouter);


app.listen(3000, () => {
  console.log('listening on port 3000..');
})