import { useSelector } from 'react-redux';
import { format } from 'date-fns'; // date formatting library

const SingleChat = ({ message, selectedChat }) => {
    const userInfo = useSelector(state => state.auth?.userInfo);

    // Format the message time (assuming the message has a 'createdAt' field)
    const messageTime = message.createdAt ? format(new Date(message.createdAt), 'hh:mm a') : '';

    const profilePicture = selectedChat.profilePicture || selectedChat.participants?.profilePicture;

    // Determine if the message is from the current user (sender)
    const isSender = userInfo._id === message.sender;

    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isSender && (
                <img
                    src={profilePicture}
                    alt="User Profile"
                    className="rounded-full h-8 w-8 mr-1"
                />
            )}
            <div
                className={`mr-2 p-2 rounded-md max-w-[70%] break-words min-w-[100px] ${isSender ? 'bg-ternary-dark dark:bg-primary-dark text-white' : 'bg-gray-100 text-black'
                    }`}
            >
                <p>{message.message}</p>
                <p style={{ marginTop: '-5px', marginLeft: '30px' }} className={`text-xs text-right 
                        ${isSender ? 'text-gray-300' : 'text-gray-500'}
                    `} >
                    {/* {isSender &&
                        <span className='mr-1 font-semibold'>
                            ✓
                        </span>} */}
                    {messageTime}
                </p>
            </div>
        </div>
    );
};

export default SingleChat;