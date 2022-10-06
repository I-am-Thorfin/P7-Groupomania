const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const maxTry = require("../middleware/limiter")
const checkPassword = require('../middleware/checkpassword');
const auth = require('../middleware/auth');


router.get('/:id', auth, userCtrl.getOneUser);
router.post('/signup', checkPassword, userCtrl.signup); 
router.post('/login', maxTry.limiter, userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;