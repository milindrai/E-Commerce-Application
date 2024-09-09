const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
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

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
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

// Clear cart
const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
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

module.exports={addToCart,getCart,removeFromCart,clearCart};