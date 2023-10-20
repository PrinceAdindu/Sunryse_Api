const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const config = require('../config');

const {
  createTokens,
  verifyRefeshToken,
  createAccessToken,
} = require('../services/login/tokenService');
const {
  getTherapist,
  editTherapist,
} = require('../services/therapist/therapistService');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' }); // Faulty request

  let foundTherapist;

  try {
    foundTherapist = await getTherapist({ email });
    if (!foundTherapist)
      return res.status(401).json({ message: 'User does not exist' }); // Unauthorized
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error finding matching therapist' });
  }

  let match;

  try {
    match = await bcrypt.compare(password, foundTherapist.password);
  } catch (err) {
    return res.status(500).json({ message: 'Error unhashing password' });
  }

  if (!match)
    return res
      .status(401)
      .json({ message: 'Unauthorized, Incorrect password' }); // Unauthorized

  try {
    const tokenBody = { userId: foundTherapist.userId };
    const [accessToken, refreshToken] = createTokens(tokenBody);
    const therapist = await editTherapist(foundTherapist.userId, {
      refreshToken: refreshToken,
    });
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: config.refreshCookieExp,
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error creating and storing refresh token' });
  }
});

router.post('/refresh', async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: 'Unauthorized, user has no auth cookie' }); // Unauthorized
  const refreshToken = cookies.jwt;

  let foundTherapist;
  try {
    foundTherapist = await getTherapist({ refreshToken });
    if (!foundTherapist)
      return res
        .status(403)
        .json({ message: 'Forbidden, refresh token does not exist' }); // Forbidden
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error finding matching refresh token' });
  }

  const tokenBody = { userId: foundTherapist.userId };
  try {
    const valid = verifyRefeshToken(refreshToken, tokenBody);
    if (!valid)
      return res
        .status(403)
        .json({ message: 'Forbidden, refresh token is not valid' }); // Forbidden
  } catch (err) {
    return res.status(500).json({ message: 'Error verifying refresh token' });
  }
  const accessToken = createAccessToken(tokenBody);
  return res.status(200).json({ accessToken });
});

module.exports = router;
