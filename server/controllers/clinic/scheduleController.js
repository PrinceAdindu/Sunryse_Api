const express = require('express');
const { editClinic } = require('../../services/clinic/clinicService');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { timeZone, schedule } = req.body;
  const id = req.id;
  if (!timeZone || !schedule)
    return res.status(400).json({
      message: 'Timezone and schedule details are required.',
    });
  try {
    const data = {
      timeZone,
      schedule,
    };
    const newClinic = await editClinic(id, data);
    return res.status(200).json({
      message: 'Successfully saved clinic business hours.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error saving clinic business hours.',
    });
  }
});

module.exports = router;
