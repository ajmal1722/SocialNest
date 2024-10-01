import { useSocket } from "../../utils/socket/socketContext";

const MessageBoxHeader = ({ selectedChat }) => {
    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.includes(selectedChat.participants._id)

    return (
        <div className='flex items-center p-4 border-b'>
            <img 
                src={selectedChat.participants.profilePicture} alt="Profile" 
                className='rounded-full h-10 w-10' 
            />
            <div>
                <span className='ml-4 font-semibold'>{selectedChat.participants.username}</span>
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
