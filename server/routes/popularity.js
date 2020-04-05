const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/verifyToken");
const { getUserId } = require("../middlewares");
const { getUserLike } = require("../controllers/popularity");

router.get("/popularity/getUserLike", verifyToken, getUserId, getUserLike);

module.exports = router;
