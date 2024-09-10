const mongoose = require('mongoose');
const PaymentGateway = require('../models/payment-gateway');
require('dotenv').config();

// Your UPI ID
const myUpiId = process.env.myUpiId;

const processPayment = async (req, res) => {
    try {
        const { userId, paymentMethod, paymentAmount, userUpiId } = req.body;

        // Convert userId to ObjectId
        const objectIdUserId = mongoose.Types.ObjectId(userId);

        // Check if payment method is UPI and both UPI IDs are provided
        if (paymentMethod === 'UPI' && myUpiId && userUpiId) {
            // Simulate sending payment amount to user's UPI ID
            console.log(`Sending payment...`);
            console.log(`Sending ${paymentAmount} to ${userUpiId} from ${myUpiId}`);
            // Create payment record in the database
            const payment = await PaymentGateway.create({
                userId: objectIdUserId, // Use the converted ObjectId here
                paymentMethod,
                paymentAmount,
                paymentStatus: 'pending', // Assuming the payment is initially pending
                email,
                phoneNumber,
            });
           
            console.log('Payment record created:', payment);
            // Respond with payment details
            res.status(201).json({
                success: true,
                message: `Payment of ${paymentAmount} sent to ${userUpiId} from ${myUpiId}`,
                payment,
            });
        } else {
            res.status(400).json({ error: 'Invalid payment method or missing UPI ID' });
        }
    } 
    catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
};

module.exports = { processPayment };