const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/verifyToken");
const { userIsBlocked } = require("../middlewares");
const {
  filterProfile,
  sortProfile,
  readCommonTag,
  firstFilter,
  heartClick,
} = require("../controllers/match");

router.post("/match/filterProfile", verifyToken, filterProfile);
router.post("/match/sortProfile", verifyToken, sortProfile);
router.post("/match/readCommonTag", verifyToken, readCommonTag);
router.post("/match/firstFilter", verifyToken, firstFilter);
router.post("/match/heartClick", verifyToken, heartClick);
// router.post("/match/heartClick", verifyToken, userIsBlocked, heartClick);
module.exports = router;
