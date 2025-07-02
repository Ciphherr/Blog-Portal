import mongoose from 'mongoose';
import 'dotenv/config';

const dbConnection = async ()=>{
    try {
        const connected = await mongoose.connect(process.env.DATABASE_LOCATION);
        console.log(`✅ MONGODB CONNECTED SUCCESSFULLY TO HOST: ${connected.connection.host}`);
    } catch (error) {
        console.log("❌ MONGODB CONNECTION FAILED\n", error);
        process.exit(1);
    }
}

export default dbConnection;