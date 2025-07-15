import {config} from 'dotenv';
import {connect} from 'mongoose';
config()
export const connectDB=async()=>{
    try {
        await connect(process.env.MONGODB_URI);
        console.log('Server is connecting to Database :)');
    } catch (error) {
        console.log('Error is mongoose', error.message);
        process.exit(1)
    }
}