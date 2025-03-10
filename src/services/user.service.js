const User = require("../models/user.model");
const jwt = require("./jwt.service");
const bcrypt = require("bcryptjs");

const signUp = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, password } = newUser;
      // console.log(newUser);

      const user = await User.findOne({ email });
      if (user) {
        return resolve({
          status: 400, // Sử dụng số thay vì chuỗi
          message: "Email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const createUser = await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });

      if (createUser) {
        resolve({
          status: "OK",
          message: "success",
          data: createUser,
        });
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const login = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        email: obj.email,
      });

      console.log("user", user);
      console.log("obj", obj);
      const isPasswordCorrect = await bcrypt.compare(
        obj.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return resolve({
          status: 400, // Sử dụng số thay vì chuỗi
          message: "Invalid credentials",
        });
      }
      // console.log(user);
      const access_token = await jwt.genneralAccessToken({
        userId: user._id,
      });

      const refresh_token = await jwt.genneralRefreshToken({
        userId: user._id,
      });
      resolve({
        status: "OK",
        message: "success",
        data: user,
        access_token,
        refresh_token,
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        resolve({
          status: "OK",
          message: "success",
          data: user,
        });
      }
      resolve({
        status: 500,
        message: "Failed to find user",
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

module.exports = {
  signUp,
  login,
  getUser,
};
