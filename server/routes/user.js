const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const { profile } = require("../controllers/user");

router.get("/profile/me", verifyToken, profile);
// router.post("/profile/:userId", userSigninValidator, profile);

module.exports = router;
