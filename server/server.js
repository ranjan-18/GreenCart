import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

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
      app.use('/api/seller',sellerRouter)
      app.use('/api/product',productRouter)
      app.use('/api/cart',cartRouter)
      app.use('/api/address',addressRouter)
      app.use('/api/order',orderRouter)

     await connectDB();
     await connectCloudinary();
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
        
    })
