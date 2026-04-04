const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {authorizeRoles} = require("../middleware/roleMiddleware");

const { createTask } = require("../controllers/taskController");

// 🔥 ADMIN + MANAGER
router.post("/", protect, authorizeRoles("admin", "manager"), createTask);

module.exports = router;