const mongoose = require('mongoose');
const express = require('express');
const db=require('./config/db');
const cookieParser = require('cookie-parser');
const orderRoutes=require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/orders', orderRoutes);

PORT=process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log("Connected to Database"))
    .catch(err=>console.log(err));

app.listen(PORT, () => {
  console.log(`Order service listening on port ${PORT}`);
});
