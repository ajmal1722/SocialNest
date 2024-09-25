import Conversation from "./Conversation"

const ConversationListing = ({ users, getMessages }) => {
    
    return (
        <div className="h-full w-full ">
            {users?.map(user => (
                <Conversation
                    key={user._id} 
                    user={user} 
                    getMessages={getMessages}
                />
            ))}
        </div>
    )
}

export default ConversationListing
