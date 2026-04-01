const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// DEBUG CHECK (REMOVE LATER)
console.log("createTask:", typeof taskController.createTask);
console.log("protect:", typeof protect);

router.post("/", protect, taskController.createTask);
router.get("/:projectId", protect, taskController.getTasks);
router.put("/:id", protect, taskController.updateTaskStatus);

module.exports = router;