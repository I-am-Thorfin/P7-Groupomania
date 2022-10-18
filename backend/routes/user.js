const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const maxTry = require("../middleware/limiter")
const checkPassword = require('../middleware/checkpassword');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.post('/signup', checkPassword, userCtrl.signup); 
router.post('/login', maxTry.limiter, userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);

module.exports = router;