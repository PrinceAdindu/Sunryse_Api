const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('firebase/compat/auth');
require('firebase/compat/firestore');

const credentials = require('./middleware/credentials');
const corsOptions = require('./cors/corsOptions');
const routes = require('./routes/routes');
const config = require('./config');

const server = express();

function create() {
  // Handle options credentials check before CORS
  // CORS requires this header to be true and we need to send cookikes
  server.use(credentials);

  // Cross Origin Resource Sharing
  server.use(cors(corsOptions));

  // Log server requests and responses
  server.use('*', (req, res, next) => {
    console.log(`REQ <<< ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      console.log('RES >>>', 'sent');
    });
    return next();
  });

  // Connect webhook routes before middlewares
  const webhookController = require('./controllers/webhookController');
  server.use(
    '/webhook',
    express.raw({ type: 'application/json' }),
    webhookController,
  );

  // Built-in middleware for json
  server.use(express.json());

  // Middleware for cookies
  server.use(cookieParser());

  // Connect Routes
  routes.init(server);
}
async function start() {
  server.listen(config.port, () => {
    console.log('Express server listening on - ', `${config.url}`);
  });
}
module.exports = { create, start };
