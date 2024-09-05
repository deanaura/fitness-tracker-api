const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { isAdmin } = require('../utils/authMiddleware');

router.use(authController.authenticate);


router.post('/register', authController.register);
router.post('/login', authController.login);

// rute untuk admin only
router.get('/users', authController.isAdmin, authController.getAllUsers);
router.delete('/users/:id', isAdmin, authController.deleteUser);

module.exports = router;
