import { useState, useEffect } from "react";
import Conversation from "./Conversation";
import { getUnreadMessageCountPerConversationApi } from "../../utils/api/message_api";

const ConversationListing = ({ users, getMessages }) => {
    const [unreadCounts, setUnreadCounts] = useState({});

    useEffect(() => {
        const fetchUnreadCounts = async () => {
            const response = await getUnreadMessageCountPerConversationApi();
            const counts = response.unreadCounts.reduce((acc, conversation) => {
                acc[conversation.conversationId] = conversation.unreadCount;
                return acc;
            }, {});
            setUnreadCounts(counts);
        };

        fetchUnreadCounts();
    }, []);
    
    return (
        <div className="h-full w-full ">
            {users?.map(user => (
                <Conversation
                    key={user._id} 
                    user={user} 
                    getMessages={getMessages}
                    unreadCount={unreadCounts[user._id] || 0}
                />
            ))}
        </div>
    )
}

export default ConversationListing