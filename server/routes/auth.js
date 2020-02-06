const express = require("express");
const router = express.Router();

const { signup, signin, verifyAccount } = require("../controllers/auth");

const { userSignupValidator, userSigninValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);
router.post("/verifyAccount", verifyAccount);
// router.get("/signout", signout);

module.exports = router;
