const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');
const registrationController = require('../../controllers/registrationController');
const testController = require('../../controllers/testController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.use('/login', loginController);
router.use('/register', registrationController);

router.use('/test', verifyAccessToken, testController);

module.exports = router;
