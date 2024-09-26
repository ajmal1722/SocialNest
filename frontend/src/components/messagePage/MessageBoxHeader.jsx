
const MessageBoxHeader = ({ selectedChat }) => {

    return (
        <div className='flex items-center p-4 border-b'>
            <img 
                src={selectedChat.profilePicture} alt="Profile" 
                className='rounded-full h-10 w-10' 
            />
            <span className='ml-4 font-semibold'>{selectedChat.username}</span>
        </div>
    )
}

export default MessageBoxHeader
