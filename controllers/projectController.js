const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json({
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USER PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    })
      .populate("owner", "name email")
      .populate("members", "name email");

    res.status(200).json({
      message: "Projects retrieved successfully",
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROJECT
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is member
    if (!project.members.some(m => m._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view this project" });
    }

    res.status(200).json({
      message: "Project retrieved successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT (only owner)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only owner can update
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only project owner can update project" });
    }

    if (title) project.title = title;
    if (description) project.description = description;

    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MEMBER TO PROJECT
const addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only owner can add members
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    // Check if already member
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    project.members.push(userId);
    await project.save();

    const updatedProject = await project.populate("members", "name email");

    res.status(200).json({
      message: "Member added successfully",
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE MEMBER FROM PROJECT
const removeMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only owner can remove members
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can remove members" });
    }

    // Cannot remove owner
    if (userId === project.owner.toString()) {
      return res.status(400).json({ message: "Cannot remove project owner" });
    }

    project.members = project.members.filter(m => m.toString() !== userId);
    await project.save();

    const updatedProject = await project.populate("members", "name email");

    res.status(200).json({
      message: "Member removed successfully",
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT (only owner)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only owner can delete
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can delete project" });
    }

    await project.deleteOne();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  addMember,
  removeMember,
  deleteProject
};