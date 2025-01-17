import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mainRouter from './router/index.js';

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/defaultdb';


app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); 
    },
    credentials: true,
    optionSuccessStatus: 200,
}));
app.options('*', cors());


app.use(cookieParser());
app.use(bodyParser.json());


const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 50, 
    message: "Too many requests, please try again after an hour."
});
app.use(limiter);
app.set('trust proxy', 1);


app.use('/api/v1', mainRouter);

mongoose.connect(mongoUrl, {
    ssl: true,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.error("Database connection error:", err);
});


app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
