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
            newSocket = io('http://localhost:8000'); // Replace with your backend URL if necessary
            setSocket(newSocket);

            // Listen for online users or any other events
            newSocket.on('onlineUsers', (users) => {
                // console.log('Online users:', users);
                setOnlineUsers(users);
            });

            // Handle incoming notifications
            newSocket.on('notification', notification => {
                console.log('Received notification:', notification);
                setNotifications(prev => [notification, ...prev]); // Append the new notification
            });

            // Handle removing notifications in real-time
            newSocket.on('removeNotification', ({ type, senderId }) => {
                console.log('remove notification', type, senderId)
                setNotifications(prevNotifications =>
                    prevNotifications.filter(
                        notification => !(notification.type === type && notification.senderId._id === senderId)
                    )
                );
            });

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