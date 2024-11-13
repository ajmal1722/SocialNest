import React, { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let newSocket;

        if (userInfo) {
            newSocket = io('https://social-nest-backend.vercel.app', { // Replace with your backend URL if necessary
                transports: ['websocket'],
                withCredentials: true
            }); 
            setSocket(newSocket);

            // Listen for online users or any other events
            newSocket.on('onlineUsers', (users) => {
                // console.log('Online users:', users);
                setOnlineUsers(users);
            });

            // Handle incoming notifications
            newSocket.on('notification', notification => {
                console.log('Received notification:', notification.post.image_url);
                setNotifications(prev => [notification, ...prev]); // Append the new notification
            });

            // Handle removing notifications in real-time
            newSocket.on('removeNotification', ({ type, senderId, post }) => {
                console.log('remove notification', type, senderId, post);
            
                setNotifications(prevNotifications =>
                    // Filter the existing notifications based on the removal conditions
                    prevNotifications.filter(notification => {
                        // Check if the notification type is 'like' or 'comment'
                        if (type === 'like' || type === 'comment') {
                            // For 'like' and 'comment', compare notification sender and post IDs
                            // Only remove the notification if both senderId and postId match
                            return !(notification.type === type && 
                                    notification.senderId._id === senderId && 
                                    notification.post._id === post._id);
                        } else {
                            // For other notification types, compare only senderId and type
                            // Remove if both type and senderId match
                            return !(notification.type === type && notification.senderId._id === senderId);
                        }
                    })
                );
            });
            
            // newSocket.on('comment', (comment) => {
            //     console.log('comment notification:', comment)
            // })

            // Cleanup when component unmounts or user disconnects
            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        }

        // Cleanup in case userInfo is not available anymore
        return () => {
            if (newSocket) {
                newSocket.disconnect();
                setSocket(null);
            }
        };
    }, [userInfo]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, notifications, setNotifications }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = React.useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};