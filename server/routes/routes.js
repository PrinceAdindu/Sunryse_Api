/* eslint-disable max-len */
const express = require('express');
const apiRoutes = require('./api/apiRoutes');

function init(server) {
    server.use('*', (req, res, next) => {
        console.log(`Request: ${req.method}, Path: ${req.originalUrl}`);
        res.on('finish', () => {
          console.log('SEND >>>', 'sent');
        });
        return next();
      });

      server.use('/', (req, res, next) => {
        if (req.originalUrl === '/') {
          return res.status(200).json({
            message: `Terra API Version: ${config.ApiVersion}`,
          });
        }
        return next();
      });

      server.use('/api', apiRoutes);
} 

module.exports = {
init
};
