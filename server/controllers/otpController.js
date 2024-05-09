const express = require('express');
const router = express.Router();
const path = require('path');

const { getClinic, editClinic } = require('../services/clinic/clinicService');
const sendEmail = require('../services/clinic/email/emailService');

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
    return res.status(500).json({ message: 'Error finding matching clinic' });
  }

  let randomCode;
  try {
    randomCode = Math.floor(100000 + Math.random() * 900000);
    await editClinic(foundClinic.id, { otp: randomCode });
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
    return res.status(500).json({ message: 'Error finding matching clinic' });
  }

  console.log(foundClinic);
  const isVerified = foundClinic.otp === code;
  if (isVerified) {
    return res
      .status(200)
      .json({ isVerified, message: 'Successfully verfied account' });
  } else {
    return res
      .status(401)
      .json({ isVerified, message: 'Verification code is incorrect' });
  }
});

module.exports = router;
