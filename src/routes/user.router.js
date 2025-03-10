const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
//const { testMiddleware } = require("../middleware/auth.middleware");
router.post("/signIn", UserController.signIn);
router.post("/login", UserController.login);
router.get("/get-details/:id", UserController.getDetailUser);
router.post("/refresh-token", UserController.refreshToken);

module.exports = router;
