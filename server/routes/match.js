const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/verifyToken");
const {
  filterProfile,
  sortProfile,
  readCommonTag,
  firstFilter
} = require("../controllers/match");

router.post("/match/filterProfile", verifyToken, filterProfile);
router.post("/match/sortProfile", verifyToken, sortProfile);
router.post("/match/readCommonTag", verifyToken, readCommonTag);
router.post("/match/firstFilter", verifyToken, firstFilter);
module.exports = router;
