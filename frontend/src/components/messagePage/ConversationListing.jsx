import Conversation from "./Conversation"

const ConversationListing = ({ users }) => {
    console.log('userssssssss:', users);
    
    return (
        <div className="h-full w-full ">
            {users?.map(user => (
                <Conversation key={user._id} user={user} />
            ))}
        </div>
    )
}

export default ConversationListing
