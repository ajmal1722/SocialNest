import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../utils/socket/socketContext";
import ChatBox from "../components/messagePage/ChatBox";
import { convoUserApi, getMessagesApi, sendMessagesApi, markMessagesAsReadApi } from "../utils/api/message_api";
import ConversationListBox from "../components/messagePage/ConversationListBox";

const MessagePage = () => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const socket = useSocket(); // Use the shared socket instance

    const [users, setUsers] = useState(); // Refers to conversation here
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [currentUserChattingWith, setCurrentUserChattingWith] = useState(null);
    
    useEffect(() => {
        // Fetch conversations (users)
        const fetchUsers = async () => {
            const response = await convoUserApi();
            setUsers(response.conversations);
        }

        fetchUsers();

        // Handle the 'messagesRead' event when emitted from the server
        socket.on('messagesRead', ({ conversationId, userId }) => {
            if (selectedChat && selectedChat._id === conversationId) {
                console.log(`Messages marked as read for conversation ${conversationId} by user ${userId}`);
                // You can handle updating the UI based on the 'messagesRead' event here
            }
        });

        // Clean up the socket connection when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [selectedChat, socket])

    const getMessages = async (conversation) => {
        setCurrentUserChattingWith(conversation.participants._id);
        setSelectedChat(conversation);

        const response = await getMessagesApi(conversation.participants._id);
        if (response) {
            setChatMessages(response.messages);
            await markMessagesAsReadApi(conversation._id); // Marks messages as read for this conversation

            // Emit the 'messagesRead' event to the server to notify the sender
            socket.emit('messagesRead', {
                conversationId: conversation._id,
                userId: userInfo._id
            });
        }
    }

    const sendMessage = async (message) => {
        if (!currentUserChattingWith) return;

        const response = await sendMessagesApi(currentUserChattingWith, { message });
        if (response) {
            setChatMessages([...chatMessages, response.newMessage])
        }
    }

    return (
        <div className='min-h-[85vh] md:col-span-8 col-span-10 flex justify-center items-center'>
            <div className="sm:flex justify-center items-center h-[75vh] md:h-[83vh] md:mt-3 md:mx-7 mr-2">
                <ConversationListBox users={users} getMessages={getMessages} />
                <ChatBox 
                    chatMessages={chatMessages} 
                    setChatMessages={setChatMessages} 
                    onSendMessage={sendMessage} 
                    selectedChat={selectedChat}
                />
            </div>
        </div>
    )
}

export default MessagePage