const loginRouter = require('./auth');
const homeRouter = require('./home');
const apiRouter = require('./api');
const express = require('express');
const middleware = require('../middleware/middleware');

function route(app) {
  app.use('/auth',loginRouter);
  app.use('/',middleware.auth,homeRouter);
  app.use('/api/',middleware.auth,apiRouter)
  // ...
}

module.exports = route;