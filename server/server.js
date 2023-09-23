const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const { port, url } = require('./config');

const server = express();

function create() {
  server.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  server.use(express.json());
  server.use(cookieParser());

  // Connect Routes
  routes.init(server);
}
async function start() {
  server.listen(port, () => {
    console.log('Express server listening on - ', `${url}`);
  });
}
module.exports = { create, start };
