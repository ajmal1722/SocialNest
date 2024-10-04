import userSocketMap from "./userSocketMap.js"; // Object to map userId to socketId

const chatSocket = (io, socket) => {
    // When a user connects, store their userId and socketId as key-value pairs
    socket.on('userConnected', (userId) => {
        userSocketMap.set(userId, socket.id);  // Map the user ID to the socket ID
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
        console.log('Updated userSocketMap:', userSocketMap);

        // Emit all connected users to everyone
        const onlineUsers = Array.from(userSocketMap.keys());  // Convert Map keys to an array
        io.emit('onlineUsers', onlineUsers);  // Send only the userIds
    });

    // Listen for chat message events
    // socket.on('chatMessage', (message) => {
    //     console.log('New message received:', message);
    // });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);

        // Find and remove the user from the `userSocketMap`
        for (let [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);  // Remove the user from the Map
                console.log(`User ${userId} disconnected and removed from userSocketMap`);

                // Emit updated online users to everyone
                const onlineUsers = Array.from(userSocketMap.keys());
                io.emit('onlineUsers', onlineUsers);  // Update online users after disconnection
                break;
            }
        }
    });
};

export default chatSocket;