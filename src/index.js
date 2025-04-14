const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParter = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const http = require("http");
const { initSocket } = require("./config/socket");

dotenv.config();

const app = express();
const port = 3001;

// Tạo HTTP server để dùng với socket
const server = http.createServer(app);

// Khởi tạo socket
initSocket(server);

app.use(bodyParter.json({ limit: "50mb" }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn kích thước tệp là 50MB
  })
);

routes(app);

mongoose
  .connect(process.env.MongoURL)
  .then(() => {
    console.log("Connect success");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log("Server is running in port " + port);
});
