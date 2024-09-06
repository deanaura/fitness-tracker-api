const Goal = require('../models/goalModel');
const { handleError } = require('../utils/errorHandler');

class GoalController {
  async createGoal(req, res) {
    try {
      const { type, target } = req.body;
      const userId = req.user.id;
      const newGoal = new Goal({ user: userId, type, target });
      const savedGoal = await newGoal.save();
      res.status(201).json(savedGoal);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateGoal(req, res) {
    try {
      const { id } = req.params;
      const { achieved } = req.body;
      const updatedGoal = await Goal.findByIdAndUpdate(id, { achieved }, { new: true });
      if (!updatedGoal) return res.status(404).json({ message: 'Goal not found' });
      res.status(200).json(updatedGoal);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getGoals(req, res) {
    try {
      const userId = req.user.id;
      const goals = await Goal.find({ user: userId });
      res.status(200).json(goals);
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new GoalController();