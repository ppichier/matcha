const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const {
  getNotifications,
  getNotificationsNumber,
} = require("../controllers/notifications.js");
const { getUserId } = require("../middlewares/index");

router.get(
  "/notifications/getNotifications",
  verifyToken,
  getUserId,
  getNotifications
);

router.get(
  "/notifications/getNotificationsNumber",
  verifyToken,
  getUserId,
  getNotificationsNumber
);

module.exports = router;
