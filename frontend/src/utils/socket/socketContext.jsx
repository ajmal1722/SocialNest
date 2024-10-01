import React, { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        let newSocket;

        if (userInfo) {
            newSocket = io('http://localhost:8000');
            setSocket(newSocket);

            // Listen for online users or any other events
            newSocket.on('onlineUsers', (users) => {
                console.log('Online users:', users);
                setOnlineUsers(users);
            });

            // Cleanup when component unmounts or when user disconnects
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
        <SocketContext.Provider value={{ socket, onlineUsers }}>
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