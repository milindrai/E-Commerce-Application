const mongoose = require('mongoose');
const PaymentGateway = require('../models/payment-gateway');
const { transporter } = require('../nodemailer');
require('dotenv').config();

const processPayment = async (req, res) => {
    try {
        const { userId, paymentMethod, paymentAmount, userUpiId, email } = req.body;
        const objectIdUserId = new mongoose.Types.ObjectId(userId);

        if (paymentMethod === 'UPI' && process.env.myUpiId && userUpiId) {
            const payment = await PaymentGateway.create({
                userId: objectIdUserId,
                paymentMethod,
                paymentAmount,
                paymentStatus: 'pending',
                email,
            });

            // Send email notification
            const mailOptions = {
                from: `VortexCommerce <${process.env.youremail}>`,
                to: email,
                subject: 'Action Required: Complete Your Payment Now',
                text: `Greetings! Your payment of Rs.${paymentAmount}/- is pending. Please complete it using the UPI ID: ${process.env.myUpiId} to complete your transaction. Thank you for choosing us!`,
            };

            if (email) {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
            } else {
                console.error('Email not defined, cannot send email.');
            }

            res.status(201).json({
                success: true,
                message: `Payment of ${paymentAmount} sent to ${userUpiId} from ${process.env.myUpiId}`,
                payment,
            });
        } else {
            res.status(400).json({ error: 'Invalid payment method or missing UPI ID' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
};

module.exports = { processPayment };
