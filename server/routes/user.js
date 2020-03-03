const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/verifyToken");
const {
  uploadProfileImage,
  uploadSecondaryImages,
  deleteProfileImage,
  deleteSecondaryImage,
  readSecondaryImages,
  readImage,
  readProfile,
  changePage,
  updateProfile,
  deleteTag
} = require("../controllers/user");

const {
  createUploadDirectory,
  deletePreviousImage,
  updateTags
} = require("../middlewares/users");

const { updateProfileValidator } = require("../validator");

router.post("/changePage", verifyToken, changePage);
// router.get("/profile/me", verifyToken, profile);
router.post(
  "/profile/updateProfile",
  verifyToken,
  updateProfileValidator,
  updateTags,
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

router.get("/profile/readSecondaryImages", verifyToken, readSecondaryImages);
router.get("/profile/readImage", verifyToken, readImage);
router.post("/profile/readProfile", verifyToken, readProfile);
// router.post("/profile/updateProfile", updateProfileValidator, updateProfile);
// router.post("/profile/updateProfile", updateProfile);

// router.get("/uploadImage", verifyToken, uploadImage);
// router.post("/profile/:userId", userSigninValidator, profile);

module.exports = router;
