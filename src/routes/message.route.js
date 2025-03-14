const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
router.post("/create", MessageController.createMessage);
router.post("/get_message", MessageController.getMessage);
router.put("/update/:id", MessageController.updateMessage);
router.put("/delete/:id", MessageController.deleteMessage);
module.exports = router;
