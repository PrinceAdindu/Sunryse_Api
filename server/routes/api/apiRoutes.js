const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');
const registrationController = require('../../controllers/registrationController');
const logoutController = require('../../controllers/logoutController');
const clinicController = require('../../controllers/clinic/clinicController');
const stripeController = require('../../controllers/stripeController');
const testController = require('../../controllers/testController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.use('/login', loginController);
router.use('/register', registrationController);

router.use('/logout', verifyAccessToken, logoutController);
router.use('/clinic', verifyAccessToken, clinicController);
router.use('/stripe', verifyAccessToken, stripeController);
router.use('/test', verifyAccessToken, testController);

module.exports = router;
