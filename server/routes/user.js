const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const {
  profile,
  uploadImage,
  readImage,
  changePage
} = require("../controllers/user");

router.post("/changePage", verifyToken, changePage);
router.get("/profile/me", verifyToken, profile);
router.get("/profile/updateProfile", verifyToken, profile);
router.post("/profile/uploadImage", uploadImage);
router.get("/profile/readImage", readImage);
// router.get("/uploadImage", verifyToken, uploadImage);
// router.post("/profile/:userId", userSigninValidator, profile);

module.exports = router;
