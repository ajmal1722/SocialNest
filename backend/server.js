import express from 'express'; // Express framework for creating web server
import dotenv from 'dotenv'; // dotenv for loading environment variables
import morgan from 'morgan'; // Morgan for logging HTTP requests
import { createServer } from 'http'; // Create an HTTP server
import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import cors from 'cors'; // Enable Cross-Origin Resource Sharing (CORS)
import connectDB from './database/connection.js'; // Function to connect to MongoDB
import userAuthRouter from './routes/userAuthRouter.js'; // Router for user authentication-related endpoints
import postRouter from './routes/postRouter.js'; // Router for post-related endpoints
import followRouter from './routes/followRouter.js'; // Router for follow-related endpoints
import adminRouter from './routes/adminRouter.js'; // Router for admin-related endpoints
import { specs, swaggerUi } from './utils/swagger.js'; // Swagger for API documentation
import { initializeSocket } from './sockets/index.js'; // Socket.io initialization

// Load environment variables from .env file
dotenv.config();

const app = express(); // Create Express app

// CORS options to allow requests from specific origin
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Include cookies in requests
};

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(morgan('tiny')); // Log HTTP requests using morgan's 'tiny' format
app.use(cors(corsOptions)); // Enable CORS using the specified options

// Connect to MongoDB database
connectDB();

// Set up Swagger UI for API documentation at /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Define route handlers
app.use('/user', userAuthRouter); // Routes for user authentication
app.use('/post', postRouter); // Routes for posts (create, delete, etc.)
app.use('/follow', followRouter); // Routes for following/unfollowing users
app.use('/admin', adminRouter); // Routes for admin-specific functionalities

// Define server port, fallback to 3000 if not set in environment
const PORT = process.env.PORT || 3000;

// Create HTTP server to use with Express app
const httpServer = createServer(app);

// Initialize Socket.io server
initializeSocket(httpServer); // Set up WebSocket events for real-time communication

// Basic route for root path, sends a simple welcome message
app.get('/', (req, res) => {
    res.send('Hello Folk! Welcome to socialNest, Server is Running...');
});

// Start the server and listen for incoming requests on the specified port
httpServer.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});

export default app; // Export Express app for potential external usage