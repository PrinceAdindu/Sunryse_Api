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
const { getClinic, editClinic } = require('../services/clinic/clinicService');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' }); // Faulty request

  let foundClinic;

  try {
    foundClinic = await getClinic({ email });
    if (!foundClinic)
      return res.status(401).json({ message: 'Clinic does not exist' }); // Unauthorized
  } catch (err) {
    return res.status(500).json({ message: 'Error finding matching clinic' });
  }

  try {
    const match = await bcrypt.compare(password, foundClinic.password);
    if (!match)
      return res
        .status(401)
        .json({ message: 'Unauthorized, Incorrect password' }); // Unauthorized
  } catch (err) {
    return res.status(500).json({ message: 'Error unhashing password' });
  }

  try {
    const tokenBody = { id: foundClinic.id };
    const [accessToken, refreshToken] = createTokens(tokenBody);
    const clinic = await editClinic(foundClinic.id, {
      refreshToken: refreshToken,
    });
    res.cookie('clinicjwt', refreshToken, {
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
  if (!cookies?.clinicjwt)
    return res
      .status(401)
      .json({ message: 'Unauthorized, user has no auth cookie' }); // Unauthorized
  const refreshToken = cookies.clinicjwt;

  let foundClinic;
  try {
    foundClinic = await getClinic({ refreshToken });
    if (!foundClinic)
      return res
        .status(403)
        .json({ message: 'Forbidden, refresh token does not exist' }); // Forbidden
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error finding matching refresh token' });
  }

  const tokenBody = { id: foundClinic.id };
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
