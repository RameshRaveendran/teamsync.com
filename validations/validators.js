// ================================================
// 🔹 INPUT VALIDATION FUNCTIONS
// ================================================

// ============================================
// 1️⃣ AUTH VALIDATORS
// ============================================

/**
 * Validate registration input
 */
const validateRegisterInput = (name, email, password) => {
  const errors = [];

  // Name validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return errors;
};

/**
 * Validate login input
 */
const validateLoginInput = (email, password) => {
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (!password) {
    errors.push("Password is required");
  }

  return errors;
};

// ============================================
// 2️⃣ PROJECT VALIDATORS
// ============================================

/**
 * Validate project creation input
 */
const validateProjectInput = (title, description) => {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    errors.push("Project title must be at least 3 characters");
  }

  if (description && description.length > 500) {
    errors.push("Project description cannot exceed 500 characters");
  }

  return errors;
};

// ============================================
// 3️⃣ TASK VALIDATORS
// ============================================

/**
 * Validate task creation input
 */
const validateTaskInput = (title, projectId, assignedTo) => {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    errors.push("Task title must be at least 3 characters");
  }

  if (!projectId) {
    errors.push("projectId is required");
  }

  if (!assignedTo) {
    errors.push("assignedTo userId is required");
  }

  return errors;
};

/**
 * Validate task status
 */
const validateTaskStatus = (status) => {
  const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];
  return validStatuses.includes(status);
};

// ============================================
// 4️⃣ COMMENT VALIDATORS
// ============================================

/**
 * Validate comment input
 */
const validateCommentInput = (text) => {
  const errors = [];

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    errors.push("Comment text is required and cannot be empty");
  }

  if (text && text.length > 1000) {
    errors.push("Comment text cannot exceed 1000 characters");
  }

  return errors;
};

// ============================================
// 5️⃣ UTILITY VALIDATORS
// ============================================

/**
 * Check if string is valid MongoDB ObjectId
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Validate user ID
 */
const validateUserId = (userId) => {
  if (!userId || !isValidObjectId(userId)) {
    return "Invalid user ID format. Must be a valid MongoDB ObjectId";
  }
  return null;
};

/**
 * Validate project ID
 */
const validateProjectId = (projectId) => {
  if (!projectId || !isValidObjectId(projectId)) {
    return "Invalid project ID format. Must be a valid MongoDB ObjectId";
  }
  return null;
};

/**
 * Validate task ID
 */
const validateTaskId = (taskId) => {
  if (!taskId || !isValidObjectId(taskId)) {
    return "Invalid task ID format. Must be a valid MongoDB ObjectId";
  }
  return null;
};

// ================================================
// 🔹 EXPORTS
// ================================================

module.exports = {
  // Auth
  validateRegisterInput,
  validateLoginInput,

  // Projects
  validateProjectInput,

  // Tasks
  validateTaskInput,
  validateTaskStatus,

  // Comments
  validateCommentInput,

  // Utilities
  isValidObjectId,
  validateUserId,
  validateProjectId,
  validateTaskId
};
