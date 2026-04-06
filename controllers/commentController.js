const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Project = require("../models/Project");

const addComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;

    // ✅ 1. Validate required fields
    if (!taskId || !text) {
      return res.status(400).json({ 
        message: "taskId and text are required",
        error: "Bad Request" 
      });
    }

    // ✅ 2. Validate taskId is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ 
        message: `Invalid taskId format: "${taskId}". Must be a valid MongoDB ObjectId`,
        error: "Invalid ObjectId" 
      });
    }

    // ✅ 3. Validate text is not empty
    if (typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({ 
        message: "Comment text cannot be empty",
        error: "Validation Error" 
      });
    }

    // ✅ 4. Check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ 
        message: `Task with ID "${taskId}" not found`,
        error: "Task Not Found" 
      });
    }

    // ✅ 5. Check user is part of project (optional but recommended)
    const project = await Project.findById(task.projectId);
    if (project && project.members && !project.members.includes(req.user.id)) {
      return res.status(403).json({ 
        message: "You are not a member of this project",
        error: "Forbidden" 
      });
    }

    // ✅ 6. Create comment
    const comment = await Comment.create({
      taskId,
      userId: req.user.id,
      text: text.trim()
    });

    // ✅ 7. Populate user info for socket event
    const populatedComment = await comment.populate("userId", "name email");

    // ✅ 8. Emit only to users subscribed to this task's room
    if (req.io) {
      req.io.to(`task-${taskId}`).emit("newComment", populatedComment);
    }

    res.status(201).json({
      message: "Comment added successfully",
      data: populatedComment
    });

  } catch (error) {
    console.error("Error in addComment:", error);
    res.status(500).json({ 
      message: "Failed to add comment",
      error: error.message 
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    // ✅ 1. Validate taskId is provided
    if (!taskId) {
      return res.status(400).json({ 
        message: "taskId is required",
        error: "Bad Request" 
      });
    }

    // ✅ 2. Validate taskId is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ 
        message: `Invalid taskId format: "${taskId}". Must be a valid MongoDB ObjectId`,
        error: "Invalid ObjectId" 
      });
    }

    // ✅ 3. Check if task exists
    const taskExists = await Task.findById(taskId);
    if (!taskExists) {
      return res.status(404).json({ 
        message: `Task with ID "${taskId}" not found`,
        error: "Task Not Found" 
      });
    }

    // ✅ 4. Fetch comments
    const comments = await Comment.find({ taskId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      message: "Comments retrieved successfully",
      count: comments.length,
      data: comments
    });

  } catch (error) {
    console.error("Error in getComments:", error);
    res.status(500).json({ 
      message: "Failed to fetch comments",
      error: error.message 
    });
  }
};

module.exports = {
  addComment,
  getComments
};