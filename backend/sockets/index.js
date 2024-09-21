import { Server } from 'socket.io';
import chatSocket from './chatSocket.js';

let io;

export const initializeSocket = httpServer => {
    io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', socket => {
        console.log(`Socket ${socket.id} connected`);

        // Initialize chat socket events
        chatSocket(io, socket);

        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected`);
        });
    })
}

export const getSocketIo = () => io;