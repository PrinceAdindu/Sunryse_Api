const express = require('express');
const bcrypt = require('bcrypt');
const { getClinic, editClinic } = require('../services/clinic/clinicService');
const {
  verifyResetPasswordData,
} = require('../middleware/resetpassword/verifyResetPasswordData');
const router = express.Router();

router.post('/clinic', verifyResetPasswordData, async (req, res) => {
  const { email, password } = req.body.data;

  let foundClinic;
  try {
    foundClinic = await getClinic({ email });
    if (!foundClinic) {
      return res
        .status(401)
        .json({ message: 'You are not Authorized to update clinic password' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error finding matching clinic' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await editClinic(foundClinic.id, {
      password: hashedPassword,
    });
    res.status(200).json({ message: 'password successfully updated.' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Unable to update your password. Try again. ' });
  }
});

module.exports = router;
