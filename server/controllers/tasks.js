const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res.status(200).json({ success: true, tasks });
});

const addTask = asyncWrapper(async (req, res) => {
  const { task, isCompleted } = req.body;
  const newTask = await Task.create({ task, isCompleted });
  res.status(201).json({ success: true, task: newTask });
});

const editTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const editedTask = await Task.findByIdAndUpdate(id, task, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, task: editedTask });
});

const completeTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const isCompleted = req.body;
  const completedTask = await Task.findByIdAndUpdate(id, isCompleted, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, task: completedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ success: false, msg: "Item not found" });
  }
  res.status(200).json({ success: true, msg: "Item deleted successfully" });
});

module.exports = { getTasks, addTask, editTask, completeTask, deleteTask };
