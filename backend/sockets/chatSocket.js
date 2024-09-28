const users = {} // Object to map userId to socketId

const chatSocket = (io, socket) => {
    // When a user connects, store their userId and socketId as key value pairs
    socket.on('userConnected', (userId) => {
        users[userId] = socket.id; // Store the socket id for the connected user
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });
    
    // Listen for chat message events
    socket.on('chatMessage', (message) => {
        console.log('New message received:', message);
        // Emit the message to all clients
        io.emit('chatMessage', message);
    });
}

export default chatSocket;