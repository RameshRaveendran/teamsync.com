const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
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

const getProjects = async (req, res) => {
  const projects = await Project.find({
    members: req.user.id
  });

  res.json(projects);
};

const addMember = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Owner check
  if (project.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only owner can add members" });
  }

  // Prevent duplicate
  if (project.members.includes(req.body.userId)) {
    return res.status(400).json({ message: "User already member" });
  }

  project.members.push(req.body.userId);
  await project.save();

  res.json(project);
};