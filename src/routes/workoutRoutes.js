const express = require('express');
const workoutController = require('../controllers/workoutController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/workouts', authController.authenticate, workoutController.createWorkout);
router.get('/workouts', authController.authenticate, workoutController.getWorkouts);
router.get('/workouts/stats', authController.authenticate, workoutController.getStats);
router.delete('/workouts/:id', authController.authenticate, workoutController.deleteWorkout);

module.exports = router;