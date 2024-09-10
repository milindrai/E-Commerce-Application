const PaymentGateway = require('../models/payment-gateway');


const processPayment = async (req, res) => {
    try {
        const { userId, paymentMethod, paymentAmount } = req.body;
        const payment = await PaymentGateway.create({ userId, paymentMethod, paymentAmount });
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process payment' });
    }
};

module.exports = { processPayment };