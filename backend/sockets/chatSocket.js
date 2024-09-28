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
        const { receiverId, senderId } = message; // Receive receiverId and senderId from client side

        // Find the socket of the receiver
        const receiverSocketId = users[receiverId];

        if (receiverSocketId) {
            // Send the message to the specific user
            io.to(receiverSocketId).emit('chatMessage', message);
            console.log('Message sent To specific user');
        } else {
            console.log('Receiver not connected');
        }

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected`);

            // Find and remove the user from the users object
            for (let userId in users) {
                if (users[userId] === socket.id) {
                    delete users[userId];
                    break;
                }
            }
        });
    });
}

export default chatSocket;