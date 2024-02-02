const express = require('express');
const router = express.Router();
const { registerController, loginController, logoutController, forgotPasswordController } = require('../controllers/user');
const { authenticate } = require('../middlewares/auth')

router.post('/register', registerController);
router.post('/login', authenticate, loginController);
router.post('/logout', logoutController);
router.post('/forgot-password', forgotPasswordController);

module.exports = router;
