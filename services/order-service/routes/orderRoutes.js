const express = require('express');
const router = express.Router();

const { createOrder, getOrders, cancelOrder } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');

router.post('/',authenticate, createOrder);
router.get('/myOrders',authenticate, getOrders);
router.delete('/:orderId',authenticate, cancelOrder);

module.exports = router;