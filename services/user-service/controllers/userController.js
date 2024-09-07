const User=require('../models/User');
const bcrypt = require('bcryptjs');
const env=require('dotenv');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:'User already exists'});
        }

        user=new User({
            name,
            email,
            password
        });
        await user.save();

        // Generate JWT token
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);

        // Store the token in a cookie
        res.cookie('token', token, {
            httpOnly: true, // The cookie is only accessible by the web server
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production environment
            sameSite: 'strict', // Strictly same site
        });
        
        res.status(201).json({message:'User registered successfully'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.json({message:'Login successful'});
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}



module.exports={registerUser,loginUser};