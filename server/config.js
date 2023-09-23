require('dotenv').config();

const dev = {
  apiVersion: '1.0.0',
  port: process.env.DEV_PORT,
  url: process.env.DEV_URL,
};

const prod = {
  apiVersion: '1.0.0',
  port: process.env.PROD_PORT,
  url: process.env.PROD_URL,
};

let config;
if (process.env.NODE_ENV === 'dev') {
  config = dev;
} else {
  config = prod;
}

module.exports = config;
