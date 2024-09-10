const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { processPayment } = require('../controllers/gatewayController');

router.post('/pay', authenticate, processPayment);

module.exports = router;