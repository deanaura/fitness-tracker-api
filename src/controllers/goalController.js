const Goal = require('../models/goalModel');
const { handleError } = require('../utils/errorHandler');

class GoalController {
  // menambahkan goal baru
  async addGoal(req, res) {
    try {
      const { goalName, target } = req.body;
      const newGoal = new Goal({
        userId: req.user.id,
        goalName,
        target
      });
      const savedGoal = await newGoal.save();
      res.status(201).json(savedGoal);
    } catch (error) {
      handleError(res, error);
    }
  }

  // mendapatkan semua goal user
  async getGoals(req, res) {
    try {
      const goals = await Goal.find({ userId: req.user.id });
      res.status(200).json(goals);
    } catch (error) {
      handleError(res, error);
    }
  }

  // memperbarui progress goal
  async updateGoal(req, res) {
    try {
      const { progress } = req.body;
      const { id } = req.params;

      const goal = await Goal.findById(id);

      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      // update progress dan simpan
      goal.progress = progress;
      const updatedGoal = await goal.save();

      res.status(200).json(updatedGoal);
    } catch (error) {
      handleError(res, error);
    }
  }

  // menghapus goal
  async deleteGoal(req, res) {
    try {
      const { id } = req.params;

      const deletedGoal = await Goal.findByIdAndDelete(id);

      if (!deletedGoal) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new GoalController();