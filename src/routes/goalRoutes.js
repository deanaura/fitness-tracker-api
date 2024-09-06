const express = require('express');
const goalController = require('../controllers/goalController');
const authController = require('../controllers/authController');
const router = express.Router();

// rute untuk goal
router.post('/goals', authController.authenticate, goalController.addGoal);
router.get('/goals', authController.authenticate, goalController.getGoals);
router.put('/goals/:id', authController.authenticate, goalController.updateGoal);
router.delete('/goals/:id', authController.authenticate, goalController.deleteGoal);

module.exports = router;