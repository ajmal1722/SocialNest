import { useSocket } from "../../utils/socket/socketContext";

const MessageBoxHeader = ({ selectedChat }) => {
    const userId = selectedChat.participants?._id ||selectedChat._id;
    const profilePicture = selectedChat.participants?.profilePicture || selectedChat.profilePicture;
    const username = selectedChat.participants?.username|| selectedChat.username;

    console.log('selectedChat', selectedChat)

    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.includes(userId);

    return (
        <div className='flex items-center p-4 border-b'>
            <img 
                src={profilePicture} alt="Profile" 
                className='rounded-full h-10 w-10' 
            />
            <div>
                <span className='ml-4 font-semibold'>{username}</span>
                {isOnline && (
                    <p className="ml-4 text-center text-green-500 text-sm font-semibold">
                        Online
                    </p>
                )}
            </div>
        </div>
    )
}

export default MessageBoxHeader
