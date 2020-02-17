const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  verifyAccount,
  forgotPassword,
  recoverPassword
} = require("../controllers/auth");

const {
  userSignupValidator,
  userSigninValidator,
  recoverPasswordValidator,
  forgotPasswordValidator
} = require("../validator");
const { verifyToken } = require("../controllers/verifyToken");

const { userSignupValidator, userSigninValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);
router.post("/verifyAccount", verifyAccount);
router.post("/forgotPassword", forgotPasswordValidator, forgotPassword);
router.post("/recoverPassword", recoverPasswordValidator, recoverPassword);
router.post("/verifyToken", verifyToken);
// router.get("/signout", signout);

module.exports = router;
