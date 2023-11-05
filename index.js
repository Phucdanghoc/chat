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


// Define a connection event handler for Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  // Define a message event handler
  socket.on('message', (msg) => {
    console.log('Received message:', msg);

    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });

  // Define a disconnect event handler
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});




server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
