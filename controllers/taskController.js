const Task = require("../models/Task");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

const createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    // Validate required fields
    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if assignedTo user is member of project
    if (!project.members.includes(assignedTo)) {
      return res.status(403).json({ message: "User is not a member of this project" });
    }

    // 1️⃣ Create Task
    const task = await Task.create({
      title,
      projectId,
      assignedTo,
      status: "TODO"
    });

    // 2️⃣ Create Notification (DB)
    const notification = await Notification.create({
      userId: assignedTo,
      message: `You have been assigned a new task: ${title}`,
      type: "TASK_ASSIGNED"
    });

    // 3️⃣ Emit via Socket to assigned user
    if (req.io) {
      req.io.to(assignedTo.toString()).emit("notification", notification);
    }

    // 4️⃣ Response
    res.status(201).json({
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask };

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "name email")
      .populate("projectId", "title");

    res.status(200).json({
      message: "Tasks retrieved successfully",
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be: TODO, IN_PROGRESS, DONE"
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only assigned user can update task status
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only assigned user can update task status" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK (only assigned user or project owner)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate("projectId");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is assigned or is project owner
    const isAssigned = task.assignedTo.toString() === req.user.id;
    const isProjectOwner = task.projectId.owner.toString() === req.user.id;

    if (!isAssigned && !isProjectOwner) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
};