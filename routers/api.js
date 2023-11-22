const express = require('express');
const ChatRoomController = require('../controllers/ChatRoomController');
const router = express.Router();


// roomChat
router.get('/chatroom',ChatRoomController.getAll);
router.get('/chatroom/:id',ChatRoomController.getMessageByChatRoom);

module.exports = router;
