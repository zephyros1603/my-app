// For Mongoose (MongoDB)
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try{await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
    
  }
  catch (error){console.log(error);}
};

export default connectDB;