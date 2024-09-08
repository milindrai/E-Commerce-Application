const express = require('express');
const router = express.Router();
const {createProduct, getProducts, updateDetails, deleteProduct, searchProduct} = require('../controllers/productController');

router.post('/create',createProduct);
router.get('/details', getProducts);
router.put('/update/:id', updateDetails);
router.delete('/delete/:id', deleteProduct);
router.get('/search',searchProduct)


module.exports = router;
