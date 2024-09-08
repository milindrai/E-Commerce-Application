const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDetails=async (req,res)=>{
    const {name,description,price,category}=req.body;
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        product.name=name || product.name;
        product.description=description || product.description;
        product.price=price || product.price;
        product.category=category || product.category;
        await product.save();
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

const deleteProduct=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        await product.remove();
        res.status(200).json({message:'Product deleted successfully'});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

const searchProduct = async (req, res) => {
    try {
        const { name, description, minPrice, maxPrice, category } = req.body;
        let queryConditions = [];
        
        if (name) {
            queryConditions.push({ name: { $regex: name, $options: 'i' } });
        }
        if (description) {
            queryConditions.push({ description: { $regex: description, $options: 'i' } });
        }
        if (category) {
            queryConditions.push({ category: { $regex: category, $options: 'i' } });
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
            queryConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
        }
        
        const products = await Product.find({
            $or: queryConditions.length > 0 ? queryConditions : [{}]
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addReview=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        const review=req.body;
        product.reviews.push(review);
        await product.save();
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

const getReviews=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json(product.reviews);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

const deleteReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Assuming `reviewId` is passed as a parameter in the request URL
        const reviewId = req.params.reviewId;
        // Filter out the review to delete
        product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId);
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/Milind2/Desktop/basic'); // specify the folder to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // save with unique name
    },
});

const upload = multer({ storage: storage });

const uploadProductImage = async (req, res) => {
    try {
        const productId = req.params.productId;
        const imagePath = req.file.path;

        // Logic to associate image path with the product in the database
        const product = await Product.findById(productId);
        product.image = imagePath;
        await product.save();

        res.json({ message: 'Image uploaded successfully', imagePath });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

const getProductImage = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!product.image) {
            return res.status(404).json({ message: 'Image not found for the product' });
        }
        res.sendFile(product.image);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image' });
    }
};

module.exports={createProduct,getProducts,updateDetails,deleteProduct,searchProduct,addReview,getReviews,deleteReview,uploadProductImage,upload,getProductImage};