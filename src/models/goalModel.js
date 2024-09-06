const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalName: { type: String, required: true },
  target: { type: Number, required: true }, 
  progress: { type: Number, default: 0 },   
  date: { type: Date, default: Date.now }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;