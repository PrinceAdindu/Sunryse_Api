const jwt = require('jsonwebtoken');
const config = require('../config');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401); // Unauthorizes
  console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token forbidden
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyAccessToken;
