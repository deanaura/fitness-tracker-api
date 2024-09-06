const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { isAdmin } = require('../utils/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);

// middleware untuk autentikasi setelah login
router.use(authController.authenticate);

// rute untuk admin only
router.get('/users', authController.isAdmin, authController.getAllUsers);
router.delete('/users/:id', isAdmin, authController.deleteUser);

module.exports = router;
