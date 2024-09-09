const express=require('express');
const db=require('./config/db');
const app=express();
const cartRoutes=require('./routes/cartRoutes');
const mongoose=require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

app.use('/api/cart',cartRoutes);

const PORT=process.env.PORT || 5003;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Database Connected'))
    .catch((err)=>console.error('Database Connection error',err));

app.listen(PORT,()=>{
    console.log(`ShoppingCart-service is running on ${PORT}`);
})
