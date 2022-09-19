const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const maxTry = require("../middleware/limiter")
const checkPassword = require('../middleware/checkpassword');

router.post('/signup', checkPassword, userCtrl.signup); 
router.post('/login', maxTry.limiter, userCtrl.login);

module.exports = router;