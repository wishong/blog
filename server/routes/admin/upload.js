const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadArticle = multer({ dest: __dirname + '/../../uploads/article/' });

router.post('/article', uploadArticle.single('file'), async (req, res) => {
  const file = req.file;
  file.url = `http://localhost:3000/uploads/article/${file.filename}`;
  res.send(file);
})

module.exports = router;