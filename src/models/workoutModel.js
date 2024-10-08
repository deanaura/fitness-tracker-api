const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  exercise: { type: String, required: true },
  duration: { type: Number, required: true }, 
  caloriesBurned: { type: Number, required: true }, 
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
