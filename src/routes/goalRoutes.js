const express = require('express');
const goalController = require('../controllers/goalController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/goals', authController.authenticate, goalController.createGoal);
router.put('/goals/:id', authController.authenticate, goalController.updateGoal);
router.get('/goals', authController.authenticate, goalController.getGoals);

module.exports = router;