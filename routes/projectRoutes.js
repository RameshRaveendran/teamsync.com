const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { deleteProject } = require("../controllers/projectController");

// 🔥 ONLY ADMIN
router.delete("/:id", protect, authorizeRoles("admin"), deleteProject);

module.exports = router;