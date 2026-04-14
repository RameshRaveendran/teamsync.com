const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");

// ============================================
// 🔹 CREATE TASK (Admin + Manager)
// ============================================
router.post("/",
  protect,
  authorizeRoles("admin", "manager"),
  createTask);
// POST /api/tasks

// ============================================
// 🔹 GET TASKS BY PROJECT
// ============================================
router.get("/:projectId", protect, getTasks);
// GET /api/tasks/:projectId

// ============================================
// 🔹 UPDATE TASK STATUS (Assigned user only)
// ============================================
router.put("/:id", protect, updateTaskStatus);
// PUT /api/tasks/:id

// ============================================
// 🔹 DELETE TASK (Assigned user or project owner)
// ============================================
router.delete("/:id", protect, deleteTask);
// DELETE /api/tasks/:id

module.exports = router;