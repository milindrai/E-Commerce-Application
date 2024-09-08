const express = require('express');
const db=require('./config/db');
const app = express();
const productRoutes = require('./routes/productRoutes');
const mongoose  = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');


app.use(express.json());

app.use(cookieParser());

app.use('/api/products',productRoutes);

const PORT=process.env.PORT || 5002;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Database connected'))
    .catch(err=>console.error('Database connection error',err));

app.listen(PORT, () => {
    console.log(`Product-service is running on port ${PORT}`);
});