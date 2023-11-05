const express = require('express');
const ChatroomController = require('../controllers/ChatroomController');
const router = express.Router();


// roomChat
router.get('/chatroom',ChatroomController.getAll);

module.exports = router;
