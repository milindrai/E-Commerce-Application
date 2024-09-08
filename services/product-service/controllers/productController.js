const Product = require('../models/Product');

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

module.exports={createProduct,getProducts,updateDetails};