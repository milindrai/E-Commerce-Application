const User=require('../models/User');
const bcrypt = require('bcryptjs');
const env=require('dotenv');
const jwt=require('jsonwebtoken');
const authMiddleware=require('../middleware/authenticate');

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

const logoutUser=async(req,res)=>{
    res.clearCookie('token');
    res.json({message:'Logout successful'});
}

const getUser = async (req, res) => {
    const {email}=req.body;
    try {
        let user=await User.findOne({email}).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        // Ensure the user exists
        let user = await User.findById(req.user.userId); // Note: Using req.user.userId
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        // Return updated user details without the password
        const updatedUser = await User.findById(req.user.userId).select('-password');
        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports={registerUser,loginUser,logoutUser,getUser,updateUser};