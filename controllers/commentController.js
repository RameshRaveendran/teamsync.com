const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Project = require("../models/Project");

const addComment = async (req, res) => {
  const { taskId, text } = req.body;

  // 1. Check task exists
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  // 2. Check user is part of project
  const project = await Project.findById(task.projectId);
  if (!project.members.includes(req.user.id)) {
    return res.status(403).json({ message: "Not allowed" });
  }

  // 3. Create comment
  const comment = await Comment.create({
    taskId,
    userId: req.user.id,
    text
  });

  res.json(comment);
};

const getComments = async (req, res) => {
  const { taskId } = req.params;

  const comments = await Comment.find({ taskId })
    .populate("userId", "name email");

  res.json(comments);
};

module.exports = { addComment , getComments};