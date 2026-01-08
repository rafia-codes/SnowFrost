import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api',(req,res,next)=>next());

app.use('/auth',authRoutes);

app.listen(3001,()=>{
    console.log(`Listening`);
})