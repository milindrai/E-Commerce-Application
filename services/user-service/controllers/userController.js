const User=require('../models/User');

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
        res.status(201).json({message:'User registered successfully'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports={registerUser};