const Task = require("../models/Task");
const {Project} = require("../models/Project");


const Notification = require("../models/Notification");

const createTask = async (req, res) => {

  // 1️⃣ Create Task
  const task = await Task.create({
    title: req.body.title,
    projectId: req.body.projectId,
    assignedTo: req.body.assignedTo,
    status: "TODO"
  });

  // 2️⃣ Create Notification (DB)
  const notification = await Notification.create({
    userId: req.body.assignedTo,
    message: "You have been assigned a new task",
    type: "TASK_ASSIGNED"
  });

  // 3️⃣ Emit via Socket
  req.io
    .to(req.body.assignedTo.toString())
    .emit("notification", notification);

  // 4️⃣ Response
  res.json(task);
};
// 🔥 MANAGER + ADMIN CAN CREATE TASK
const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    projectId: req.body.projectId,
    assignedTo: req.body.assignedTo,
    status: "TODO"
  });

  res.json(task);
};

module.exports = { createTask };

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};