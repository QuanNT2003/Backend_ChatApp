const UserServices = require("../services/user.service");
const JwtServices = require("../services/jwt.service");
const signIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(200).json({
        status: "ERR",
        massage: "The input is required",
      });
    }
    const respone = await UserServices.signUp(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        massage: "The input is required",
      });
    }
    const respone = await UserServices.login(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const respone = await UserServices.getUser(id);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const respone = await JwtServices.refreshTokenService(refreshToken);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const respone = await UserServices.updateUser(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const respone = await UserServices.updatePassword(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      messge: e,
    });
  }
};
module.exports = {
  signIn,
  login,
  getDetailUser,
  refreshToken,
  updateUser,
  updatePassword,
};
