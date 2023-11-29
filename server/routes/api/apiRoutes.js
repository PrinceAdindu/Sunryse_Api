const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');
const registrationController = require('../../controllers/registrationController');
const stripeController = require('../../controllers/stripeController');
const logoutController = require('../../controllers/logoutController');
const clinicController = require('../../controllers/clinicController');
const testController = require('../../controllers/testController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.use('/login', loginController);
router.use('/register', registrationController);
router.use('/stripe', stripeController);

router.use('/logout', verifyAccessToken, logoutController);
router.use('/clinic', verifyAccessToken, clinicController);
router.use('/test', verifyAccessToken, testController);

module.exports = router;
