const UserRouter = require("./user.route");
const MessageRouter = require("./message.route");
const ImageRouter = require("./image.route");
const routes = (app) => {
  app.use("/user", UserRouter);
  app.use("/message", MessageRouter);
  app.use("/image", ImageRouter);
};

module.exports = routes;
