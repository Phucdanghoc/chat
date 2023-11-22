const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chatRoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  lastTimeUpadate: Date,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Danh sách thành viên trong phòng chat.
});


module.exports = mongoose.model('ChatRoom', chatRoomSchema);

