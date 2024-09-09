const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartController');

router.post('/add', addToCart);

router.get('/:userId', getCart);

router.post('/remove', removeFromCart);

router.post('/clear/:userId', clearCart);

module.exports = router;
