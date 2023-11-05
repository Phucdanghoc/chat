const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  content: String,
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }, 
  timestamp: { type: Date, default: Date.now }, 
});


module.exports = mongoose.model('Message', messageSchema);

