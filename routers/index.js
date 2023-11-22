const loginRouter = require('./auth');
const homeRouter = require('./home');
const apiRouter = require('./api');
const middleware = require('../middleware/middleware');

function route(app) {
  app.use('/auth',loginRouter);
  app.use('/',middleware.auth,homeRouter );
  app.use('/api/v1',apiRouter);
  
  // ...
}

module.exports = route;