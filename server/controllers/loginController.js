const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  res.status(200).send({
    message: 'Login request receieved',
  });
});

module.exports = router;
