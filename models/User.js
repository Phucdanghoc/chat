const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true,unique : true, index: true },
  password: { type: String, required: true },
  avatar: Buffer,
});


module.exports = mongoose.model("User", userSchema);