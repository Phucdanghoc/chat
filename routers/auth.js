const express = require('express');
const router = express.Router();
const AuthController =  require('../controllers/AuthController');
const Test = require('../controllers/Test');

router.get('/login',AuthController.loginIndex);
router.post('/login',AuthController.login);

router.get('/register',AuthController.registerIndex);
router.post('/register',AuthController.register);



//test
router.get('/test',Test.index);
module.exports = router;
