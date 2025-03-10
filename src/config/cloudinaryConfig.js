const cloudinary = require("cloudinary").v2;

// Thay thế bằng thông tin của bạn từ Cloudinary Dashboard
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Cloudinary_api_key,
  api_secret: process.env.Cloudinary_api_secret,
});

module.exports = cloudinary;
