import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Allow multiple origins
const allowedOrigins = ['https://greencart3-sius.onrender.com'];

// Middleware
app.use(express.json());
app.use(cookieParser());
    app.use(cors({
        origin:allowedOrigins,
        credential:true
    }))

    app.get('/',(req,res)=>{
        res.send("API is Working")
    })


      app.use('/api/user',userRouter)

     connectDB();
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
        
    })
