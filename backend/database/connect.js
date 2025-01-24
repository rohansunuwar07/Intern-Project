import mongoose from "mongoose";
import { dbPath } from "../utils/config.js";

const connectDb = async () => {
    try {
        const data = await mongoose.connect(dbPath);
        console.log(`Mongodb connected with server : ${data.connection.host}`);

        // handling mongoose error 
        mongoose.connection.on("error", (err) => {
            console.error(`Mongoose Connection Error: ${err.message}`)
        }
        )
    } catch (error) {
        console.error(`MongoDB connection error:`, error);
        process.exit(1);
    }

}
export default connectDb;
