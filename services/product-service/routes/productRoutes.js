const express = require('express');
const router = express.Router();
const {createProduct, getProducts, updateDetails, deleteProduct, searchProduct, addReview, getReviews, deleteReview,upload,uploadProductImage, getProductImage} = require('../controllers/productController');


router.post('/create',createProduct);
router.get('/details', getProducts);
router.put('/update/:id', updateDetails);
router.delete('/delete/:id', deleteProduct);
router.get('/search',searchProduct);
router.post('/:id/review',addReview);
router.get('/:id/reviews',getReviews);
router.delete('/:productId/reviews/:reviewId', deleteReview);
router.post('/:productId/image', upload.single('image'), uploadProductImage);
router.get('/:productId/image', getProductImage);


module.exports = router;
