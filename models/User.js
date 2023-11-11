const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true,unique : true, index: true },
  password: { type: String, required: true },
  online : { type: Boolean, default : true},
  avatar: Buffer,
});


module.exports = mongoose.model("User", userSchema);