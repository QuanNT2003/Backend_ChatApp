const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
router.post("/signIn", UserController.signIn);
router.post("/login", UserController.login);
router.get("/get_details/:id", UserController.getDetailUser);
router.post("/refresh_token", UserController.refreshToken);
router.put("/update/:id", authMiddleware, UserController.updateUser);
router.put(
  "/update_password/:id",
  authMiddleware,
  UserController.updatePassword
);
module.exports = router;
