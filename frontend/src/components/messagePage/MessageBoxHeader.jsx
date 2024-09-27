
const MessageBoxHeader = ({ selectedChat }) => {

    return (
        <div className='flex items-center p-4 border-b'>
            <img 
                src={selectedChat.participants.profilePicture} alt="Profile" 
                className='rounded-full h-10 w-10' 
            />
            <span className='ml-4 font-semibold'>{selectedChat.participants.username}</span>
        </div>
    )
}

export default MessageBoxHeader
