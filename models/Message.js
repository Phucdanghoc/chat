const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  message : String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }, 
  timestamp: { type: Date, default: Date.now }, 
});


module.exports = mongoose.model('Message', messageSchema);

