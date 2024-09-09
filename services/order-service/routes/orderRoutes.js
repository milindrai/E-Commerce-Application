const express = require('express');
const router = express.Router();

const { createOrder, getOrders, cancelOrder } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', createOrder);
router.get('/myOrders/:userId', getOrders);
router.delete('/:orderId', cancelOrder);

module.exports = router;