const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const {
  isAdmin,
  getUsersReports,
  deleteUser,
} = require("../controllers/admin");

router.post("/admin/isAdmin", verifyToken, isAdmin);
router.get("/admin/getUsersReports", getUsersReports);
router.post("/admin/deleteUser", deleteUser);

module.exports = router;
