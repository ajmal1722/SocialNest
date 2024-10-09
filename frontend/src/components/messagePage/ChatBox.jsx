import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../utils/socket/socketContext";
import MessageBoxHeader from "./MessageBoxHeader";
import ChatListing from "./ChatListing";
import MessageBoxFooter from "./MessageBoxFooter";
import NoMessage from "./NoMessage";

const ChatBox = ({
    chatMessages,
    setChatMessages,
    onSendMessage,
    selectedChat,
    currentUserChattingWith,
    unreadCounts,
    setUnreadCounts,
    setUsers
}) => {
    const [messageInput, setMessageInput] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);

    const userInfo = useSelector(state => state.auth.userInfo);
    const { socket } = useSocket(); // Use the shared socket instance

    useEffect(() => {
        // Listen for incoming messages
        socket.on('chatMessage', msg => {
            if (msg.sender === currentUserChattingWith) {
                // If the message is from the user currently chatting with, append it to the chat
                setChatMessages(prevMessages => [...prevMessages, msg]);
            } else {
                // If the message is from another user, update the unread count for that sender
                setUnreadCounts(prevUnreadCounts => ({
                    ...prevUnreadCounts,
                    [msg.conversationId]: (prevUnreadCounts[msg.conversationId] || 0) + 1
                }));
                // console.log('unreadCounts', unreadCounts)
            }

            // Update the conversation's last message and last message time
            setUsers(prevUsers => {
                console.log('prevUser:', prevUsers);

                const updatedUsers = prevUsers.map(user => {
                    if ((user.participants?._id || user._id) === msg.sender) {
                        console.log('user:', msg);

                        return {
                            ...user,
                            lastMessage: msg.message, // Update lastMessage
                            lastMessageAt: msg.createdAt
                        };
                    }
                    return user;
                });
                return updatedUsers;
            });
        });

        // Clean up the connection when the component unmounts
        return () => {
            socket.off('chatMessage');
        };
    }, [socket, currentUserChattingWith, setChatMessages, setUnreadCounts]);

    useEffect(() => {
        // Check if the user you're chatting with is blocked
        const isUserChattingWithBlocked = userInfo?.blockedUsers?.includes(currentUserChattingWith);
        setIsBlocked(isUserChattingWithBlocked);
    }, [userInfo, currentUserChattingWith]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim().length > 0) {
            // Construct a message object
            const newMessage = {
                senderId: userInfo._id,
                receiverId: selectedChat.participants?._id || selectedChat._id,
                message: messageInput,
            };

            // Emit the message to the server
            socket.emit('chatMessage', newMessage);
            onSendMessage(messageInput);
            setMessageInput(''); // Clear the input
        }
    };

    return (
        <div className='flex flex-col h-full w-full mb-8 bg-gray-300 dark:bg-secondary-dark rounded-md'>
            {selectedChat ? (
                <div className='h-full flex flex-col'>
                    <MessageBoxHeader selectedChat={selectedChat} />
                    <ChatListing
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}
                        selectedChat={selectedChat}
                    />
                    {isBlocked ?
                        <p className="text-center py-2 text-sm font-semibold text-secondary-light dark:text-red-500">
                            You're blocked by this user.
                        </p> : (
                            <MessageBoxFooter
                                messageInput={messageInput}
                                setMessageInput={setMessageInput}
                                handleSubmit={handleSubmit}
                            />
                        )
                    }
                </div>
            ) : (
                <NoMessage />
            )}
        </div>
    );
};

export default ChatBox;