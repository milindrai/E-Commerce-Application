require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const paymentGatewayRoutes = require('./routes/paymentGatewayRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/payment', paymentGatewayRoutes);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Payment-gateway-service is running on port ${PORT}`);
});
