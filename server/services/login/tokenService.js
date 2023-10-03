const jwt = require('jsonwebtoken');
const config = require('../../config');

const createAccessToken = (data) => {
  const createToken = jwt.sign(data, config.accessTokenSecret, {
    expiresIn: config.accessTokenExp,
  });
  return createToken;
};

const createRefreshToken = (data) => {
  const refreshToken = jwt.sign(data, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExp,
  });
  return refreshToken;
};

const createTokens = (data) => [
  createAccessToken(data),
  createRefreshToken(data),
];

const verifyRefeshToken = async (refreshToken, data) => {
  jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
    return err || data.userId !== decoded.userId;
  });
};

module.exports = {
  createRefreshToken,
  createTokens,
  createAccessToken,
  verifyRefeshToken,
};
