const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');

router.use('/login', loginController);

module.exports = router;
