const Payment = require('../models/Payment');
const stripe = require('../config/payment');

const processPayment = async (req, res) => {
    try {
        const { amount, currency, orderId } = req.body;

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { orderId },
        });

        // Save the payment details in the database
        const payment = new Payment({
            orderId,
            paymentId: paymentIntent.id,
            amount,
            currency,
            status: 'pending',
        });

        await payment.save();

        res.status(201).json({
            success: true,
            paymentIntent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { processPayment };