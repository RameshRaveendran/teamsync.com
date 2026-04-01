const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
const createTask = async (req, res) => {
  const { title, projectId, assignedTo, dueDate } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // check member
  if (!project.members.includes(assignedTo)) {
    return res.status(400).json({ message: "User not in project" });
  }

  const task = await Task.create({
    title,
    projectId,
    assignedTo,
    dueDate
  });

  res.json(task);
};

// GET TASKS BY PROJECT
const getTasks = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId })
    .populate("assignedTo", "name email");

  res.json(tasks);
};

// UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // only assigned user can update
  if (task.assignedTo.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  task.status = status;
  await task.save();

  res.json(task);
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};