const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
    try {
        // Extract userId from req.user instead of req.body
        const userId = req.user.userId;
        const { productId } = req.body;
        let quantity = Number(req.body.quantity); // Convert quantity to a number
        if (isNaN(quantity)) {
            return res.status(400).send('Quantity must be a number');
        }

        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId == productId);
            if (productIndex > -1) {
                let productItem = cart.products[productIndex];
                productItem.quantity += quantity;
                cart.products[productIndex] = productItem;
            } else {
                cart.products.push({ productId, quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            const newCart = await Cart.create({ userId, products: [{ productId, quantity }] });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

const goToCart=async(req,res)=>{
    try{
        userId=req.user.userId;
        const cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).send('Cart not found');
        }
        res.status(200).send(cart);
    }
    catch(err){
        res.status(500).send('Server Error');
    }
};

const modifyQuantity = async (req, res) => {
    try {
        userId = req.user.userId;
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId == productId);
            if (productIndex > -1) {
                let productItem = cart.products[productIndex];
                productItem.quantity = quantity;
                cart.products[productIndex] = productItem;
                cart = await cart.save();
                return res.status(200).send(cart);
            }
        }
        res.status(404).send('Cart not found');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

const removeFromCart = async (req, res) => {
    try {
        userId = req.user.userId;
        const { productId } = req.body;
        let cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = cart.products.filter(p => p.productId != productId);
            cart = await cart.save();
            return res.status(200).send(cart);
        }
        res.status(404).send('Cart not found');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

const clearCart = async (req, res) => {
    try {
        userId = req.user.userId;
        let cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = [];
            cart = await cart.save();
            return res.status(200).send(cart);
        }
        res.status(404).send('Cart not found');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports={addToCart,goToCart,removeFromCart,clearCart,modifyQuantity};