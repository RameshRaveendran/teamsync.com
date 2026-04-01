const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");



router.post("/", protect, projectController.createProject);
router.get("/", protect, projectController.getProjects);
router.put("/:id/add-member", protect, projectController.addMember);

module.exports = router;