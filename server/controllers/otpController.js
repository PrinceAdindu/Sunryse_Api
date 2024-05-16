const express = require('express');
const router = express.Router();
const path = require('path');

const { getClinic, editClinic } = require('../services/clinic/clinicService');
const sendEmail = require('../services/clinic/email/emailService');
const { otpExpirationMinutes } = require('../config');
const {
  generateOTP,
  calculateExpirationTime,
} = require('../utilities/otpUtils');

router.post('/', async (req, res, next) => {
  const { email } = req.body.data;
  if (!email) {
    return res.status(400).json({ message: 'Email is required to send OTP' }); // Faulty request
  }

  let foundClinic;
  try {
    foundClinic = await getClinic({ email });
    if (!foundClinic)
      return res.status(401).json({ message: 'Clinic does not exist' }); // Unauthorized
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: 'Error finding matching clinic' });
  }
  let randomCode;
  let expirationTime;
  try {
    randomCode = generateOTP();
    expirationTime = calculateExpirationTime(otpExpirationMinutes);
    await editClinic(foundClinic.id, {
      otp: { code: randomCode, expirationTime },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error storing one time passcode' });
  }

  try {
    const clinicName = foundClinic.clinicName;
    await sendEmail(
      path.join(__dirname, '..', '..', 'assets', 'otpEmailTemplate'),
      { name: clinicName, code: randomCode },
      email,
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error sending one time passcode' });
  }
  return res
    .status(200)
    .json({ message: 'Successfully saved and sent one time passcode' });
});

router.post('/verify', async (req, res, next) => {
  const { email, code } = req.body.data;
  if (!email || !code) {
    return res.status(400).json({ message: 'Required data missing' }); // Faulty request
  }

  let foundClinic;
  try {
    foundClinic = await getClinic({ email });
    if (!foundClinic)
      return res.status(401).json({ message: 'Clinic does not exist' }); // Unauthorized
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: 'Error finding matching clinic' });
  }

  const { code: otp, expirationTime = '' } = foundClinic?.otp;
  const isVerified = otp === code;
  const isExpired = expirationTime.toDate() > new Date();

  if (isVerified && isExpired) {
    return res
      .status(200)
      .json({ isVerified: true, message: 'Successfully verified account' });
  } else if (!isExpired) {
    console.log('expired if clause');
    return res
      .status(401)
      .json({ isVerified: false, message: 'Otp Code expired, Resend again.' });
  } else {
    return res
      .status(401)
      .json({ isVerified: false, message: 'Verification code is incorrect' });
  }
});

module.exports = router;
