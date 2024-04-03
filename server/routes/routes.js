const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const { apiVersion } = require('../config');

function init(server) {
  server.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      return res.status(200).json({
        message: `Terra API Version: ${apiVersion}`,
      });
    }
    return next();
  });

  server.use('/api', apiRoutes);
}

module.exports = { init };
