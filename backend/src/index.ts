import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const start = async () => {
    try {
        if(!process.env.MONGO_URI) {
            throw new Error('MONGO_URI must be defined')
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongodb");
    } catch (err) {
        console.log(err);
    }

    app.listen(5000, () => {
        console.log("Running on port 5000")
    })
}

start();