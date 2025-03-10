const UserRouter = require("./user.router");
const MessageRouter = require("./message.route");
const routes = (app) => {
  app.use("/user", UserRouter);
  app.use("/message", MessageRouter);
};

module.exports = routes;
