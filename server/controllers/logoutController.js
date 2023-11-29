const express = require('express');
const router = express.Router();
const { getClinic, editClinic } = require('../services/clinic/clinicService');

router.post('/', async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt)
      return res.status(200).json({ message: 'Logout successful' });
    const refreshToken = cookies.jwt;

    const foundClinic = await getClinic({ refreshToken });
    if (foundClinic) {
      await editClinic(foundClinic.id, { refreshToken: '' });
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error - logout unsuccessful' });
  }
});

module.exports = router;
