const Workout = require('../models/workoutModel');
const { handleError } = require('../utils/errorHandler');

class WorkoutController {
  // buat latihan baru
  async createWorkout(req, res) {
    try {
      const { exercise, duration, caloriesBurned } = req.body;
      const newWorkout = new Workout({ exercise, duration, caloriesBurned });
      const savedWorkout = await newWorkout.save();
      res.status(201).json(savedWorkout);
    } catch (error) {
      handleError(res, error);
    }
  }

  // lihat riwayat latihan
  async getWorkouts(req, res) {
    try {
      const workouts = await Workout.find();
      res.status(200).json(workouts);
    } catch (error) {
      handleError(res, error);
    }
  }

  // statistik kebugaran berdasarkan waktu
  async getStats(req, res) {
    try {
      const { start, end } = req.query;
  
      const endDate = end ? new Date(end) : new Date();
  
      if (!start) {
        return res.status(400).json({ message: 'Start date is required' });
      }
  
      const workouts = await Workout.find({
        date: {
          $gte: new Date(start),
          $lte: endDate
        }
      });
  
      const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
      const totalCalories = workouts.reduce((acc, workout) => acc + workout.caloriesBurned, 0);
  
      res.status(200).json({
        totalDuration,
        totalCalories
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // hapus catatan latihan
  async deleteWorkout(req, res) {
    try {
      const { id } = req.params;
      const deletedWorkout = await Workout.findByIdAndDelete(id);
      if (!deletedWorkout) return res.status(404).json({ message: 'Workout not found' });
      res.status(200).json({ message: 'Workout deleted' });
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new WorkoutController();
