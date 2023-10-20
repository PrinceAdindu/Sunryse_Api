const express = require('express');
const router = express.Router();

const {
  getTherapist,
  createTherapist,
} = require('../services/therapist/therapistService');

router.post('/therapist', async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      message: 'Email, password and full name are required for registration.',
    });

  try {
    const foundTherapist = await getTherapist({ email });
    if (foundTherapist) {
      return res.status(409).json({
        message: 'This email is already registered',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error checking to see if therapist already exists.',
    });
  }

  try {
    const data = {
      email,
      password,
      firstname,
      lastname,
    };
    const newTherapist = await createTherapist(data);
    return res.status(200).json({
      message: 'Successfully created therapist.',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error creating a therapist.',
    });
  }
});

module.exports = router;
