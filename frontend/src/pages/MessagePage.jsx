import { useState, useEffect } from "react";
import ChatBox from "../components/messagePage/ChatBox"
import { convoUserApi, getMessagesApi, sendMessagesApi } from "../utils/api/message_api";
import ConversationListBox from "../components/messagePage/ConversationListBox";

const MessagePage = () => {
    const [users, setUsers] = useState();
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const [currentUserChattingWith, setCurrentUserChattingWith] = useState(null);
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await convoUserApi();
            setUsers(response.users);
        }

        fetchUsers()
    }, [])

    const getMessages = async (userData) => {
        setCurrentUserChattingWith(userData._id);
        setSelectedChat(userData);
        
        const response = await getMessagesApi(userData._id);
        if (response) {
            setChatMessages(response.messages);
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
