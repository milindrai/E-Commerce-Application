const express = require('express');
const router = express.Router();
const {createProduct, getProducts, updateDetails, deleteProduct, searchProduct, addReview, getReviews, deleteReview,upload,uploadProductImage, getProductImage, deleteProductImage, updateStock} = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');


router.post('/create',authenticate,createProduct);
router.get('/details',authenticate, getProducts);
router.put('/update/:id',authenticate, updateDetails);
router.delete('/delete/:id',authenticate, deleteProduct);
router.get('/search',authenticate,searchProduct);
router.post('/:id/review',authenticate,addReview);
router.get('/:id/reviews',authenticate,getReviews);
router.delete('/:productId/reviews/:reviewId', authenticate,deleteReview);
router.post('/:productId/image', upload.single('image'), authenticate,uploadProductImage);
router.get('/:productId/image',authenticate, getProductImage);
router.delete('/:productId/image',authenticate, deleteProductImage);
router.patch('/:productId/stock/update',authenticate,updateStock);

module.exports = router;
