const express = require('express');

const app = express();
app.use(express.json());
app.use(require('cors')());

const adminRouter = require('./routes/admin');

app.use('/admin/api', adminRouter)


app.listen(3000, () => {
  console.log('listening on port 3000..');
})