import { Server } from 'socket.io'; // Import the Socket.io Server class
import chatSocket from './chatSocket.js'; // Import the chat socket event handler

let io; // Variable to store the initialized Socket.io instance

// Function to initialize Socket.io server
export const initializeSocket = httpServer => {
    // Create a new Socket.io instance, attaching it to the provided HTTP server
    io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173', // Allow connections from this origin
            methods: ['GET', 'POST'], // Allowed methods for WebSocket
            credentials: true, // Allow cookies in WebSocket connections
        }
    });

    // Listen for new connections to the WebSocket server
    io.on('connection', socket => {
        console.log(`Socket ${socket.id} connected`); // Log the connected client's socket ID

        // Set up chat socket events for the connected client
        chatSocket(io, socket);

        // Listen for when a client disconnects
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected`); // Log the disconnected socket ID
        });
    })
}

// Function to return the initialized Socket.io instance for use in other parts of the app
export const getSocketIo = () => io;