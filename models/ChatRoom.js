const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chatRoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Danh sách thành viên trong phòng chat.
});


module.exports = mongoose.model('ChatRoom', chatRoomSchema);

