import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import {  } from '../../utils/api/message_api'
import MessageBoxHeader from "./MessageBoxHeader";
import ChatListing from "./ChatListing";
import MessageBoxFooter from "./MessageBoxFooter";

const socket = io('http://localhost:8000');

const ChatBox = ({ chatMessages, setChatMessages, onSendMessage }) => {
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // Listen for incoming messages
        socket.on('chatMessage', msg => {
            setChatMessages(prevMessages => [...prevMessages, msg])
        })

        // Clean up the connection when the component unmounts
        return () => {
            socket.off('chatMessage')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim().length > 0) {
            // Emit the message to the server
            socket.emit('chatMessage', messageInput);
            onSendMessage(messageInput)
            setMessageInput(''); // Clear the input
        }
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='bg-gray-300 dark:bg-secondary-dark mb-8 h-full flex flex-col rounded-md'>
                <MessageBoxHeader />
                <ChatListing 
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                />
                <MessageBoxFooter 
                    messageInput={messageInput}
                    setMessageInput={setMessageInput}
                    handleSubmit={handleSubmit} 
                />
            </div>
        </div>
    )
}

export default ChatBox;