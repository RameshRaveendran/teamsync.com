// ================================================
// 🔹 NOTIFICATION CONTROLLER
// ================================================

const Notification = require("../models/Notification");

// ============================================
// 🔹 GET USER NOTIFICATIONS
// ============================================
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    res.status(200).json({
      message: "Notifications retrieved successfully",
      unreadCount,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// 🔹 GET UNREAD NOTIFICATIONS COUNT
// ============================================
const getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    res.status(200).json({
      message: "Unread count retrieved",
      unreadCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// 🔹 MARK NOTIFICATION AS READ
// ============================================
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Check ownership
    if (notification.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      data: notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// 🔹 MARK ALL AS READ
// ============================================
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      message: "All notifications marked as read"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// 🔹 DELETE NOTIFICATION
// ============================================
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Check ownership
    if (notification.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await notification.deleteOne();

    res.status(200).json({
      message: "Notification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// 🔹 DELETE ALL NOTIFICATIONS
// ============================================
const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.user.id });

    res.status(200).json({
      message: "All notifications deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================================
// 🔹 EXPORTS
// ================================================

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
};
