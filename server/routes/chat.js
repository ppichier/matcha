const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const { getUserId } = require("../middlewares");
const { getMatchUsers } = require("../controllers/chat");

router.get("/chat/getMatchUsers", verifyToken, getUserId, getMatchUsers);

module.exports = router;
