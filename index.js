const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const handlebars = require('express-handlebars');
const db = require('./config');
const route = require('./routers/index');
const SocketService = require('./services/SocketService');

require('dotenv').config();

const { PORT, KEY_SESSION } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
global._io = io;

db.connect();
const sessionMiddleware = session({
  saveUninitialized: true,
  secret: KEY_SESSION,
  resave: false,
  cookie: {
    maxAge: 1000 * 200000
  }
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport')(passport);

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    defaultLayout: false
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

route(app);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'))
  }
});
io.on('connection',SocketService.connection);

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
