const mongoose = require('mongoose');
const PaymentGateway = require('../models/payment-gateway');
require('dotenv').config();
const { transporter } = require('../nodemailer');



const myUpiId = process.env.myUpiId;

const processPayment = async (req, res) => {
    try {
        const { userId, paymentMethod, paymentAmount, userUpiId, email, phoneNumber } = req.body;
        const objectIdUserId = new mongoose.Types.ObjectId(userId);

        if (paymentMethod === 'UPI' && myUpiId && userUpiId) {
            console.log(`Sending payment...`);
            console.log(`Sending ${paymentAmount} to ${userUpiId} from ${myUpiId}`);
            const payment = await PaymentGateway.create({
                userId: objectIdUserId,
                paymentMethod,
                paymentAmount,
                paymentStatus: 'pending',
                email,
                phoneNumber,
            });
           
            console.log('Payment record created:', payment);

            // Send an email notification
            const mailOptions = {
                from: process.env.youremail,
                to: email, // Use the email from the payment record
                subject: 'Payment Processed',
                text: `Complete your payment of ${paymentAmount} to ${myUpiId} has been processed.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.status(201).json({
                success: true,
                message: `Payment of ${paymentAmount} sent to ${userUpiId} from ${myUpiId}`,
                payment,
            });
        } else {
            res.status(400).json({ error: 'Invalid payment method or missing UPI ID' });
        }
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
};

module.exports = { processPayment };