const express = require('express');
const router = express.Router();

const { createOrder, getOrders } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', createOrder);
router.get('/myOrders/:userId', getOrders);

module.exports = router;