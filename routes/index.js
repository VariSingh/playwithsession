var express = require('express');
var router = express.Router();
const userCtrl = require("../controller/users.controller");
const { checkSignIn } = require('../middleware/auth.middleware');

router.get('/',checkSignIn, userCtrl.home);

router.get('/register', userCtrl.register);
router.post('/register-submit', userCtrl.registerSubmit);

router.get('/login', userCtrl.login);
router.post('/login-submit', userCtrl.loginSubmit);

router.get('/logout', userCtrl.logoutSubmit);

module.exports = router;
