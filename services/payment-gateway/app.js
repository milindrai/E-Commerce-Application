const express=require('express');
const db=require('./config/db');
const app=express();
const paymentGatewayRoutes=require('./routes/paymentGatewayRoutes');
const mongoose=require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use('/api/payment',paymentGatewayRoutes);

const PORT=process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Database Connected'))
    .catch((err)=>console.error('Database Connection error',err));

app.listen(PORT,()=>{
    console.log(`Payment-service is running on ${PORT}`);
})