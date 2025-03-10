const UserRouter = require("./user.router");

const routes = (app) => {
  app.use("/user", UserRouter);
};

module.exports = routes;
