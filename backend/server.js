import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './database/connection.js';
import userAuthRouter from './routes/userAuthRouter.js';
import postRouter from './routes/postRouter.js';
import followRouter from './routes/followRouter.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

const app = express();

// Cors options
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan('tiny')); // Logging requests
app.use(cors(corsOptions)); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

app.use('/user', userAuthRouter);
app.use('/post', postRouter);
app.use('/follow', followRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});