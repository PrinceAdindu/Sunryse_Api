const express = require('express');
const router = express.Router();
const scheduleController = require('./scheduleController');
const serviceController = require('./service/serviceController');
const { getClinic } = require('../../services/clinic/clinicService');

router.get('/', async (req, res, next) => {
  const id = req.id;
  const properties = req.query.properties;
  try {
    const clinic = await getClinic({ id });

    // Extract properties from clinic based on req.properties
    const resObj = {};
    properties.forEach((property) => {
      if (clinic.hasOwnProperty(property)) {
        resObj[property] = clinic[property];
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
