import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../utils/socket/socketContext";
import ChatBox from "../components/messagePage/ChatBox";
import { convoUserApi, getMessagesApi, sendMessagesApi, markMessagesAsReadApi } from "../utils/api/message_api";
import ConversationListBox from "../components/messagePage/ConversationListBox";

const MessagePage = () => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const { socket } = useSocket();  // Use the shared socket instance

    const [users, setUsers] = useState(); // Refers to conversation here
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [currentUserChattingWith, setCurrentUserChattingWith] = useState(null);
    const [unreadCounts, setUnreadCounts] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await convoUserApi();
            setUsers(response.conversations);
        }

        fetchUsers();

        // Handle the 'messagesRead' event when emitted from the server
        socket.on('messagesRead', ({ conversationId, userId }) => {
            if (selectedChat && selectedChat._id === conversationId) {
                console.log(`Messages marked as read for conversation ${conversationId} by user ${userId}`);
                // Optional: update UI for messages being read
            }
        });

        return () => {
            socket.off('messagesRead');  // Properly clean up the listener
        };
    }, [selectedChat, socket, chatMessages]);

    const getMessages = async (conversation) => {
        setChatMessages([])
        const userId = conversation.participants?._id || conversation._id;
        setCurrentUserChattingWith(userId);
        setSelectedChat(conversation);
        // console.log('unread message', conversation)

        const response = await getMessagesApi(userId);
        if (response.messages?.length > 0) {
            setChatMessages(response.messages);

            // Reset unread counts for this conversation
            // if (!conversation.participants?._id) {
            setUnreadCounts(prev => ({
                ...prev,
                [conversation._id]: 0
            }));
            // }

            await markMessagesAsReadApi(conversation._id); // Mark messages as read

            // Emit the 'messagesRead' event to the server
            socket.emit('messagesRead', {
                conversationId: conversation._id,
                userId: userInfo._id
            });
        }
    };

    const sendMessage = async (message) => {
        if (!currentUserChattingWith) return;

        const response = await sendMessagesApi(currentUserChattingWith, { message });
        // console.log('check', response)
        if (response) {
            setChatMessages([...chatMessages, response.newMessage]);

            // Update the conversation's last message and last message time
            setUsers(prevUsers => {
                const updatedUsers = prevUsers.map(user => {
                    if ((user.participants?._id || user._id) === currentUserChattingWith) {
                        return {
                            ...user,
                            lastMessage: response.newMessage.content, // Assuming the message has a 'content' field
                            lastMessageAt: response.newMessage.createdAt // Assuming the message has a 'createdAt' field
                        };
                    }
                    return user;
                });
                return updatedUsers;
            });
        }
    };

    return (
        <div className='min-h-[85vh] md:col-span-8 col-span-10 flex justify-center items-center'>
            <div className="sm:flex justify-center items-center h-[75vh] md:h-[83vh] md:mt-3 md:mx-7 mr-2">
                <ConversationListBox
                    users={users}
                    getMessages={getMessages}
                    setSelectedChat={setSelectedChat}
                    unreadCounts={unreadCounts}
                    setUnreadCounts={setUnreadCounts}
                />
                <ChatBox
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                    onSendMessage={sendMessage}
                    selectedChat={selectedChat}
                    currentUserChattingWith={currentUserChattingWith}
                    unreadCounts={unreadCounts}
                    setUnreadCounts={setUnreadCounts}
                    setUsers={setUsers}
                />
            </div>
        </div>
    );
};

export default MessagePage;