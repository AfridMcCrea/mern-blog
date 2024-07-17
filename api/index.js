import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

const app = express();
app.use(express.json());



mongoose.connect(process.env.MONGO).then(() => {
  console.log("mongodb connected");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 ');
});

app.use('/api/user' , userRoutes);
app.use('/api/auth' , authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        sucess: false,
        statusCode,
        message,
    });
});
