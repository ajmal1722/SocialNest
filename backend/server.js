import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/connection.js';
import userAuthRouter from './routes/userAuthRouter.js';
import postRouter from './routes/postRouter.js';
import followRouter from './routes/followRouter.js';
import adminRouter from './routes/adminRouter.js';
import { specs, swaggerUi } from './utils/swagger.js';
import { initializeSocket } from './sockets/index.js';

dotenv.config();

const app = express();

// Cors options
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};


// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan('tiny')); // Logging requests
app.use(cors(corsOptions)); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

// Serve static Swagger UI assets
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/user', userAuthRouter);
app.use('/post', postRouter);
app.use('/follow', followRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

// Initialize Socket.io
initializeSocket(httpServer);

app.get('/', (req, res) => {
    res.send('Hello Folk! Welcome to socialNest, Server is Running...');
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});

export default app;