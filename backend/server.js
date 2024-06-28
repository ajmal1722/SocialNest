import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import connectDB from './database/connection.js';
import userAuthRouter from './routes/userAuthRouter.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json()); // Ensure the server can parse JSON
app.use(morgan('tiny')); // Log requests
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
connectDB();

// Load routers
app.use('/user', userAuthRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});