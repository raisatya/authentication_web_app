import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

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

    app.listen(PORT, () =>
      {console.log(
        `[server]: running on port: ${PORT} | http://localhost:${PORT}/`
      )}
    );
}

start();