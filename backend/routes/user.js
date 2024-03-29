const express = require('express');
const router = express.Router();
const { registerController, loginController, logoutController, forgotPasswordController, currentUser } = require('../controllers/user');
const { authenticate } = require('../middlewares/auth')

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.post('/forgot-password', forgotPasswordController); //TODO

router.get('/current-user', authenticate, currentUser);

module.exports = router;
