const cloudinary = require("cloudinary").v2;

// Thay thế bằng thông tin của bạn từ Cloudinary Dashboard

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Cloudinary configured:", cloudinary.config());
} catch (err) {
  console.error("Cloudinary config error:", err);
}

module.exports = cloudinary;
