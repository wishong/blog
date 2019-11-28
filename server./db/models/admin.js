const mongoose = require('../mongo/db');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String}
})

const AdminModel = mongoose.model('admin', adminSchema);


module.exports = AdminModel;