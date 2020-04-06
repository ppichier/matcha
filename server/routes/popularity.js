const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/verifyToken");
const { getUserId } = require("../middlewares");
const { getUserLike, getUserVisit } = require("../controllers/popularity");

router.get("/popularity/getUserLike", verifyToken, getUserId, getUserLike);
router.get("/popularity/getUserVisit", verifyToken, getUserId, getUserVisit);

module.exports = router;
