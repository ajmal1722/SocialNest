import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './database/connection.js';
import userAuthRouter from './routes/userAuthRouter.js';
import postRouter from './routes/postRouter.js';
import followRouter from './routes/followRouter.js'
import { specs, swaggerUi } from './utils/swagger.js';
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

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});