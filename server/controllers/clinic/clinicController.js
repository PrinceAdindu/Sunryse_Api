const express = require('express');
const router = express.Router();
const scheduleController = require('./scheduleController');
const serviceController = require('./service/serviceController');
const { getClinic } = require('../../services/clinic/clinicService');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/', verifyAccessToken, async (req, res, next) => {
  const id = req.id;
  const fields = req.query.fields;
  try {
    const clinic = await getClinic({ id });

    // Extract fields from clinic based on req.field
    const resObj = {};
    fields.forEach((f) => {
      if (clinic.hasOwnProperty(f)) {
        resObj[f] = clinic[f];
      }
    });

    return res.status(200).json({
      ...resObj,
      message: 'Successfully retrieved clinic details.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error retrieving clinic details.',
    });
  }
});

router.use('/schedule', scheduleController);

router.use('/service', serviceController);

module.exports = router;
