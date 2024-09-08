const express = require('express');
const router = express.Router();
const {createProduct, getProducts, updateDetails} = require('../controllers/productController');

router.post('/create',createProduct);
router.get('/details', getProducts);
router.put('/update/:id', updateDetails);

// Add other routes as needed

module.exports = router;
