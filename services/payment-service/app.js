const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5005;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,})
    .then(() => {console.log('Connected to Database');})
    .catch((error) => {console.error('Error connecting to Database:', error);});

app.listen(PORT, () => {
    console.log(`Payment service running on port ${PORT}`);
});
