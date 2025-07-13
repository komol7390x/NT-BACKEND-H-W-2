import { connect } from 'mongoose';
import { config } from 'dotenv'

config()

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log('Server is connecting to Database :)');

    } catch (error) {
        console.log('Error is mongoose', error.message);
        process.exit(1)
    }
}