// socket.js
const { Server } = require("socket.io");

let io; // Biến để export và dùng ở nơi khác nếu cần
let users = {};
function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // React app
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connection");
    console.log("User connected: " + socket.id);
    console.log("Current users:", users);

    socket.on("join", (userId) => {
      if (!userId) return;
      users[userId] = socket.id;
      socket.userId = userId;
      console.log("join");
      console.log("User joined:", userId);
      console.log("Current users:", users);
    });

    socket.on("sendMessage", async (data) => {
      console.log("Received sendMessage event with data:", data);
      const { senderId, reciveId } = data;
      if (users[senderId]) {
        io.to(users[senderId]).emit("receiveMessage", { ...data, self: true });
      }

      if (users[reciveId]) {
        io.to(users[reciveId]).emit("receiveMessage", data);
      } else {
        console.log("Receiver not connected:", reciveId);
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        console.log("User disconnected:", socket.userId);
        delete users[socket.userId];
        console.log("Current users after disconnect:", users);
      }
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
