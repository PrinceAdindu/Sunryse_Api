const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res, next) => {
  res.status(200).json({ message: 'all good to go' });
});

module.exports = router;
