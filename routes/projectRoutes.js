const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  addMember,
  removeMember,
  deleteProject
} = require("../controllers/projectController");

// ============================================
// 🔹 CREATE PROJECT (Any authenticated user)
// ============================================
router.post("/", protect, createProject);
// POST /api/projects

// ============================================
// 🔹 GET ALL USER PROJECTS
// ============================================
router.get("/", protect, getProjects);
// GET /api/projects

// ============================================
// 🔹 GET SINGLE PROJECT
// ============================================
router.get("/:id", protect, getProjectById);
// GET /api/projects/:id

// ============================================
// 🔹 UPDATE PROJECT (Only owner)
// ============================================
router.put("/:id", protect, updateProject);
// PUT /api/projects/:id

// ============================================
// 🔹 ADD MEMBER (Only owner)
// ============================================
router.post("/:id/members", protect, addMember);
// POST /api/projects/:id/members

// ============================================
// 🔹 REMOVE MEMBER (Only owner)
// ============================================
router.delete("/:id/members", protect, removeMember);
// DELETE /api/projects/:id/members

// ============================================
// 🔹 DELETE PROJECT (Only owner)
// ============================================
router.delete("/:id", protect, deleteProject);
// DELETE /api/projects/:id

module.exports = router;