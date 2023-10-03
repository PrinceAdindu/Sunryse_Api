const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const path = require('path');
const config = require('../config');

const {
  createTokens,
  verifyRefeshToken,
  createAccessToken,
} = require('../services/login/tokenService');

router.post('/', async (req, res, next) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  const foundUser = false; //TODO: look for user in db
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const tokenBody = { userId: foundUser.userId };
    const [accessToken, refreshToken] = createTokens(tokenBody);
    // TODO: save refresh token with the user for logout and revoke purposes
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: config.REFRESH_COOKIE_EXP,
    });
    res.status(200).json({ accessToken });
  } else {
    res.sendStatus(401);
  }
});

router.post('/refresh', async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  const foundUser = false; // usersDB.users.find(person => person.refreshToken === refreshToken); TODO: Search for the refresh token and the connected user
  if (!foundUser) return res.sendStatus(403); // Forbidden

  const tokenBody = { userId: foundUser.userId };
  const valid = verifyRefeshToken(refreshToken, tokenBody);
  if (!valid) return res.sendStatus(403); // Forbidden
  const newAccessToken = createAccessToken(tokenBody);
  return res.status(200).json({ newAccessToken });
});

module.exports = router;
