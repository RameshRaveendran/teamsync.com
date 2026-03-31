const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  addMember
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.put("/:id/add-member", protect, addMember);

module.exports = router;