const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatHistoryEntrySchema = new mongoose.Schema({
  message: { type: Schema.Types.ObjectId, ref: 'Message' },
  chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }, 
  timestamp: { type: Date, default: Date.now },
});


module.exports = mongoose.model('ChatHistoryEntry', chatHistoryEntrySchema);
