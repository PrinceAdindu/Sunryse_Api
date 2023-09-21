const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const config = require('../config/config');

const server = express();

function create() {
  server.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  // Returns middleware that parses json
  server.use(express.json());
  server.use(cookieParser());
  // Set up routes
  routes.init(server);
}
async function start() {
    server.listen(config.port, () => {
    console.log('Express server listening on - ', config.url);
  });
}
module.exports = { create, start };
