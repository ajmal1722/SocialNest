import { useSelector } from 'react-redux';
import { format } from 'date-fns'; // date formatting library

const SingleChat = ({ message, selectedChat }) => {
    const userInfo = useSelector(state => state.auth?.userInfo);

    // Format the message time (assuming the message has a 'createdAt' field)
    const messageTime = message.createdAt ? format(new Date(message.createdAt), 'hh:mm a') : '';

    const profilePicture = selectedChat.profilePicture || selectedChat.participants?.profilePicture;
    return (
        <div className={`flex ${userInfo._id === message.sender ? 'justify-end' : 'justify-start'} mb-4`}>
        <img
            src={userInfo._id === message.sender ? userInfo.profilePicture : profilePicture}
            alt="User Profile"
            className='rounded-full h-8 w-8 mr-1'
        />
            <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words min-w-[100px]'>
                <p>{message.message}</p>
                <p className='text-xs text-gray-300 text-right mt-1'>{messageTime}</p>
            </div>
        </div>
    );
};

export default SingleChat;
