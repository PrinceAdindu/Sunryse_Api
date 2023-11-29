const jwt = require('jsonwebtoken');
const config = require('../config');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ message: 'Authorization not provided' }); // Unauthorizes
  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.accessTokenSecret, (error, decoded) => {
    if (error)
      return res.status(403).json({ message: 'Inavlaid access token' }); // Invalid token forbidden
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyAccessToken;
