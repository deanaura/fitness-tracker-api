const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['duration', 'calories'], required: true },
  target: { type: Number, required: true },
  achieved: { type: Number, default: 0 }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;