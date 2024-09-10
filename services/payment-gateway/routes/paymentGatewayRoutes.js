const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { processPayment } = require('../controllers/gateway-controller');

router.post('/pay', authenticate,processPayment);

module.exports = router;