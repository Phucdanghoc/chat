const express = require('express');
const router = express.Router();
const AuthController =  require('../controllers/AuthController');
const Test = require('../controllers/Test');

router.get('/login',AuthController.loginIndex);
router.post('/login',AuthController.login);


router.get('/logout',AuthController.logout);

//test
router.get('/test',Test.index);
module.exports = router;
