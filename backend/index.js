import express from 'express';
import 'dotenv/config.js';
const app = express();
import mongoose from 'mongoose';
import cors from "cors";
import rateLimit from 'express-rate-limit';
import bodyParser from "body-parser";
const port = process.env.PORT;
import mainRouter from "./router/index.js";
import { User } from './schema.js';
import cookieParser from 'cookie-parser';

app.use(cookieParser());
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
    message: "Try After 15 mins"
});

app.use(limiter);
app.set('trust proxy', 1);

const corsOptions = {
    origin: [`http://localhost:${port}`, `http://localhost:5173`, `${process.env.FRONTEND_URL}`], 
    credentials: true,  
    optionSuccessStatus: 200,
 };
 

app.use(cors(corsOptions));
app.use("/api/v1", mainRouter);

mongoose.connect(process.env.MONGO_URL, {ssl : true,
    connectTimeoutMS: 20000, 
    socketTimeoutMS: 45000,
});
console.log("Connected to Database");

app.listen(3000, () => console.log("Server Started"));
