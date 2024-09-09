const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    const token=res.cookies['token'];
    if(!token){
        return res.status(401).json({msg:'No token provided,authorization denied'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }
};

module.exports=authenticate;
