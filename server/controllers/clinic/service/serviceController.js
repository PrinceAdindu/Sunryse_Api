const express = require('express');
const {
  createService,
  deleteService,
  editService,
} = require('../../../services/clinic/serviceService');
const {
  verifyNewServiceData,
} = require('../../../middleware/service/verifyNewServiceData');
const router = express.Router();

router.post('/', verifyNewServiceData, async (req, res, next) => {
  const id = req.id;
  const serviceData = req.body.data;
  try {
    await createService(id, serviceData);
    return res.status(200).json({
      message: 'Successfully created new service.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error creating new service.',
    });
  }
});

router.put('/', async (req, res, next) => {
  const id = req.id;
  const serviceData = req.body.data;
  try {
    await editService(id, serviceData);
    return res.status(200).json({
      message: 'Successfully updated service.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error updating service.',
    });
  }
});

router.delete('/', async (req, res, next) => {
  const id = req.id;
  const serviceId = req.body.id;
  try {
    await deleteService(id, serviceId);
    return res.status(200).json({
      message: 'Successfully deleted new service.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error deleting new service.',
    });
  }
});

module.exports = router;
