const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, clearCart, goToCart, modifyQuantity } = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/:userId', goToCart);
router.put('/modify', modifyQuantity);
router.post('/remove', removeFromCart);
router.delete('/clear/:userId', clearCart);

module.exports = router;
