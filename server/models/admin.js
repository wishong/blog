const mongoose = require('../db/index');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String, set(val) {
      return bcrypt.hashSync(val, 10);
    }
  }
})

const adminModel = mongoose.model('admin', adminSchema);


module.exports = adminModel;