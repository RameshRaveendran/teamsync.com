const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

// DEBUG (VERY IMPORTANT)
console.log("createProject:", typeof projectController.createProject);
console.log("getProjects:", typeof projectController.getProjects);
console.log("addMember:", typeof projectController.addMember);
console.log("protect:", typeof protect);

router.post("/", protect, projectController.createProject);
router.get("/", protect, projectController.getProjects);
router.put("/:id/add-member", protect, projectController.addMember);

module.exports = router;