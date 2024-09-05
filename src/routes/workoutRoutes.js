const express = require('express');
const workoutController = require('../controllers/workoutController');
const router = express.Router();

// rute untuk API
router.post('/workouts', workoutController.createWorkout);
router.get('/workouts', workoutController.getWorkouts);
router.get('/workouts/stats', workoutController.getStats);
router.delete('/workouts/:id', workoutController.deleteWorkout);

module.exports = router;