const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.get('/details', productController.getProducts);

// Add other routes as needed

module.exports = router;
