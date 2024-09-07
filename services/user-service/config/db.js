const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB connected');
    } 
    catch(err){
        console.log('MongoDB connection error:', err);
        process.exit(1);  // exit the process with a failure status
    }
}