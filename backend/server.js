import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import connectDB from './database/connection.js';
import userAuthRouter from './routes/userAuthRouter.js';

const app = express();

// Middleware
app.use(express.json()); // Ensure the server can parse JSON
app.use(morgan('tiny')); // Log requests

// Connect to MongoDB
connectDB();

// Load routers
app.use('/', userAuthRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
