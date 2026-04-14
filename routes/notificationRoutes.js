const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} = require("../controllers/notificationController");

// ============================================
// 🔹 GET ALL NOTIFICATIONS
// ============================================
router.get("/", protect, getNotifications);
// GET /api/notifications

// ============================================
// 🔹 GET UNREAD COUNT
// ============================================
router.get("/unread/count", protect, getUnreadCount);
// GET /api/notifications/unread/count

// ============================================
// 🔹 MARK AS READ
// ============================================
router.put("/:id/read", protect, markAsRead);
// PUT /api/notifications/:id/read

// ============================================
// 🔹 MARK ALL AS READ
// ============================================
router.put("/read/all", protect, markAllAsRead);
// PUT /api/notifications/read/all

// ============================================
// 🔹 DELETE NOTIFICATION
// ============================================
router.delete("/:id", protect, deleteNotification);
// DELETE /api/notifications/:id

// ============================================
// 🔹 DELETE ALL NOTIFICATIONS
// ============================================
router.delete("/", protect, deleteAllNotifications);
// DELETE /api/notifications

module.exports = router;
