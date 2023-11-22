const express = require('express');
const router = express.Router();
const HomeController =  require('../controllers/HomeController');
const ChatRoomController =  require('../controllers/ChatRoomController');


router.get('/',HomeController.index);
router.get('/join/:id', ChatRoomController.index);



module.exports = router;
