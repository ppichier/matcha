const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const {
  uploadImage,
  readImage,
  changePage,
  updateProfile
} = require("../controllers/user");

const { updateProfileValidator } = require("../validator");

router.post("/changePage", verifyToken, changePage);
// router.get("/profile/me", verifyToken, profile);
router.post(
  "/profile/updateProfile",
  verifyToken,
  updateProfileValidator,
  updateProfile
);
router.post("/profile/uploadImage", uploadImage);
router.get("/profile/readImage", readImage);
// router.get("/uploadImage", verifyToken, uploadImage);
// router.post("/profile/:userId", userSigninValidator, profile);

module.exports = router;
