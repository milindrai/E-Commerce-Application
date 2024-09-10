const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

app.post('/process-payment', (req, res) => {
    const { amount, cardNumber, expiryDate, cvv } = req.body;

    if (!amount || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ error: 'Missing required payment details' });
    }

    // Mock processing delay
    setTimeout(() => {
        const isSuccess = Math.random() > 0.1; // 90% success rate

        if (isSuccess) {
            res.json({
                transactionId: uuidv4(),
                status: 'success',
                amount,
            });
        } else {
            res.status(500).json({ error: 'Payment processing failed' });
        }
    }, 500); // Simulate a 1-second delay
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Payment gateway running on port ${PORT}`);
});
