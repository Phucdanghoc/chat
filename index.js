const path = require("path");
const express = require('express');
const http = require('http'); // We'll use the HTTP server module
const socketIO = require('socket.io'); // Require Socket.io
const handlebars = require('express-handlebars');
require('dotenv').config();
const {PORT,KEY_SESSION} = process.env;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const route = require("./routers");
const db = require('./config/index');
const User = require("./models/User");
const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = socketIO(server); // Attach Socket.io to the HTTP server


db.connect()
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(session({
  saveUninitialized: true,
  secret : KEY_SESSION,
  resave: false,
  cookie : {
    maxAge : 1000*200
  },
}))

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: false,
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "public/views"));
app.use(express.json());
app.use(cookieParser());
route(app);




const users = {};

io.on('connection', (socket) => {
  console.log(`User connected with socket ID: ${socket.id}`);

  // Xử lý các sự kiện Socket.io ở đây
  // Ví dụ: nhận và gửi tin nhắn trong phòng chat
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
  });

  socket.on('chatMessage', (data) => {
    // Lưu tin nhắn vào cơ sở dữ liệu
    console.log(data);

    // Gửi tin nhắn đến tất cả người dùng trong phòng chat
    io.to(data.roomId).emit('messageReceived', data.message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected with socket ID: ${socket.id}`);
  });
});

module.exports = io;


server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
