const Project = require("../models/Project");
const User = require("../models/User");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MEMBER
const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Owner check
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    // Check user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate
    if (project.members.some(m => m.toString() === userId)) {
      return res.status(400).json({ message: "User already member" });
    }

    project.members.push(userId);
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  addMember
};