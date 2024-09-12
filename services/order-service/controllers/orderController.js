const cookieParser = require('cookie-parser');
const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try{
    const userId = req.user.userId; // Extract userId from request object
    const order = new Order({
      userId,
      items: req.body.items,
      total: req.body.total,
      status: 'pending',
    });
    await order.save();
    res.status(201).json(order);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

const getOrders = async (req, res) => {
    try {
      const userId = req.user.userId;                       // Extract userId from request object
      const orders = await Order.find({ userId: userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId; // Extract orderId from request parameters
      const order = await Order.findById(orderId);
      order.status = 'cancelled';
      await order.save();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, getOrders , cancelOrder };
