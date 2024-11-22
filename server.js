import 'express-async-errors';
import * as dotenv from 'dotenv'
(dotenv).config();
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cloudinary from  'cloudinary'
import jobRouter from './routes/jobRoutes.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js'
//public
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'./public')));

try {
    const response = await mongoose.connect(process.env.MONGO_URI)
    console.log('MONGODB CONNECTED')
    app.listen(PORT,() => {
        console.log(`SERVER LISTENING ON ${PORT}`)
    })
} catch (error) {
    console.log(error);
    process.exit(1);
}

if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'));
}



app.use('/api/v1/jobs',authenticateUser,jobRouter)
app.use('/api/v1/users',authenticateUser,userRouter)
app.use('/api/v1/auth',authRouter)

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
})

app.use(errorHandlerMiddleware);









