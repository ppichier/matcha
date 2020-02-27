const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const {
  uploadProfileImage,
  uploadSecondaryImages,
  deleteProfileImage,
  deleteSecondaryImage,
  readImage,
  changePage,
  updateProfile
} = require("../controllers/user");

const {
  createUploadDirectory,
  deletePreviousImage
} = require("../middlewares/users");

const { updateProfileValidator } = require("../validator");

router.post("/changePage", verifyToken, changePage);
// router.get("/profile/me", verifyToken, profile);
router.post(
  "/profile/updateProfile",
  verifyToken,
  updateProfileValidator,
  updateProfile
);
router.post(
  "/profile/uploadProfileImage",
  verifyToken,
  createUploadDirectory,
  deletePreviousImage,
  uploadProfileImage
);
router.post(
  "/profile/uploadSecondaryImages",
  verifyToken,
  createUploadDirectory,
  uploadSecondaryImages
);
router.delete("/profile/deleteProfileImage", verifyToken, deleteProfileImage);
router.delete(
  "/profile/deleteSecondaryImage",
  verifyToken,
  deleteSecondaryImage
);

router.post("/profile/readImage", verifyToken, readImage);
// router.post("/profile/updateProfile", updateProfileValidator, updateProfile);
// router.post("/profile/updateProfile", updateProfile);

// router.get("/uploadImage", verifyToken, uploadImage);
// router.post("/profile/:userId", userSigninValidator, profile);

module.exports = router;
