import mongoose from "mongoose";

// Function to connect to MongoDB database

const connectDB = async () =>{
    try
    {
        mongoose.connection.on('connected',()=> console.log('Database Connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/Job-Portal`)
    }
    catch(e)
    {
        console.log(e.message)
    }
    
}

export default connectDB;