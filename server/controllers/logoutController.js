const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getTherapist,
  editTherapist,
} = require('../services/therapist/therapistService');

router.post('/', async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); // No content to return
  const refreshToken = cookies.jwt;

  const foundTherapist = await getTherapist({ refreshToken });
  if (foundTherapist) {
    await editTherapist(foundTherapist.userId, { refreshToken: '' });
  }
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(204);
});

module.exports = router;
