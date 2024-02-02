const express=require("express");
const { registerUser, loginUser, getUsers, logoutUser } = require("../controller/UserController");

const router=express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").put(logoutUser);
router.route("/users").get(getUsers);

module.exports=router;