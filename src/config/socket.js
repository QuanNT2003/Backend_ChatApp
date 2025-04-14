// socket.js
const { Server } = require("socket.io");

let io; // Biến để export và dùng ở nơi khác nếu cần

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // React app
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    // Nhận và phát tin nhắn
    socket.on("send_message", (data) => {
      console.log("Received message:", data);
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io chưa được khởi tạo!");
  }
  return io;
}

module.exports = {
  initSocket,
  getIO,
};
