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
  deleteTag,
  readGuestProfile,
  userBlocked,
  userReport,
} = require("../controllers/user");

const { getUserId, userIsBlocked } = require("../middlewares");

const {
  createUploadDirectory,
  deletePreviousImage,
  updateTags,
  checkDatabaseStatus,
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
  checkDatabaseStatus,
  createUploadDirectory,
  deletePreviousImage,
  uploadProfileImage
);
router.post(
  "/profile/uploadSecondaryImages",
  verifyToken,
  checkDatabaseStatus,
  createUploadDirectory,
  uploadSecondaryImages
);
router.post(
  "/profile/deleteProfileImage",
  verifyToken,
  checkDatabaseStatus,
  deleteProfileImage
);
router.post(
  "/profile/deleteSecondaryImage",
  verifyToken,
  checkDatabaseStatus,
  deleteSecondaryImage
);

router.post("/profile/readSecondaryImages", verifyToken, readSecondaryImages);
router.post("/profile/readImage", verifyToken, readImage);
router.post("/profile/readProfile", verifyToken, readProfile);
router.post(
  "/profile/readGuestProfile",
  verifyToken,
  getUserId,
  userIsBlocked,
  readGuestProfile
);
router.post("/profile/userBlocked", verifyToken, userBlocked);
router.post("/profile/userReport", verifyToken, userReport);

// router.post("/profile/updateProfile", updateProfileValidator, updateProfile);
// router.post("/profile/updateProfile", updateProfile);

// router.get("/uploadImage", verifyToken, uploadImage);
// router.post("/profile/:userId", userSigninValidator, profile);

module.exports = router;
