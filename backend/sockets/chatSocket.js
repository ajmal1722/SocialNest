
const chatSocket = (io, socket) => {
    // Listen for chat message events
    socket.on('chatMessage', (message) => {
        // Emit the message to all clients
        io.emit('chatMessage', message);
    });
}

export default chatSocket;