import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import postingRoutes from './routes/postingRoutes.js';
import nocRoutes from './routes/nocRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/postings',postingRoutes);
app.use('/api/noc',nocRoutes);

app.listen(3001,()=>{
    console.log(`Listening`);
});