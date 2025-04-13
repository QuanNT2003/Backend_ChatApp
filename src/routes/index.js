const UserRouter = require("./user.route");
const MessageRouter = require("./message.route");
const routes = (app) => {
  app.use("/user", UserRouter);
  app.use("/message", MessageRouter);
};

module.exports = routes;
