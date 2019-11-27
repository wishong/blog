const express = require('express');

const app = express();
app.use(express.json());
app.use(require('cors')());

const categoryRouter = require('./routes/category');
const articlesRouter = require('./routes/article');

app.use('/admin/api/categories', categoryRouter)
app.use('/admin/api/articles', articlesRouter)

app.listen(3000, () => {
  console.log('listening on port 3000..');
})