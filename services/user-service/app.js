const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');

dotenv.config();

const app=express();

app.use(express.json());

mongoose.connect(process.env.DB_URI,{useUrlParser:true,unifiedTopology:true})
    .then(()=>console.log('Database connected'))
    .catch(err=>console.error('Database connection error',err));

const userRoutes=require('./routes/userRoutes');
app.use('/api/users',userRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));