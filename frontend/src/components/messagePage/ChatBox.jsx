import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import MessageBoxHeader from "./MessageBoxHeader";
import ChatListing from "./ChatListing";
import MessageBoxFooter from "./MessageBoxFooter";
import NoMessage from "./NoMessage";

const socket = io('http://localhost:8000');

const ChatBox = ({ chatMessages, setChatMessages, onSendMessage, selectedChat }) => {
    const [messageInput, setMessageInput] = useState('');
    const userId = useSelector(state => state.auth.userInfo._id)

    useEffect(() => {
        // Listen for incoming messages
        socket.on('chatMessage', msg => {
            console.log('Received message::', msg);
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
            // Construct a message object
            const newMessage = {
                sender: userId,
                message: messageInput,
            };

            // Emit the message to the server
            socket.emit('chatMessage', newMessage);
            onSendMessage(messageInput)
            setMessageInput(''); // Clear the input
        }
    };

    return (
        <div className='flex flex-col h-full w-full mb-8 bg-gray-300 dark:bg-secondary-dark rounded-md'>
            {selectedChat ?
                <div className='h-full flex flex-col'>
                    <MessageBoxHeader selectedChat={selectedChat} />
                    <ChatListing
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}
                        selectedChat={selectedChat}
                    />
                    <MessageBoxFooter
                        messageInput={messageInput}
                        setMessageInput={setMessageInput}
                        handleSubmit={handleSubmit}
                    />
                </div> : <NoMessage />
            }
        </div>
    )
}

export default ChatBox;