const express = require("express");
const {
  UserController,
  GetUsers,
  deleteUser,
  userById,
} = require("../controllers/user");
const LoginUserBYToken = require("../middlewares/auth.middle");
const loginuser = require("../controllers/login");
const router = express.Router();

router.post("/register", UserController);
router.get("/allUsers", LoginUserBYToken, GetUsers);
router.get("/getUser/:id", LoginUserBYToken, userById);
router.delete("/delete/:id", LoginUserBYToken, deleteUser);
router.post("/login", loginuser);

module.exports = router;
