import { format } from 'date-fns';
import { useSocket } from '../../utils/socket/socketContext';

const Conversation = ({ user, getMessages, unreadCount, setSelectedChat }) => {
    // Format the message time (assuming the message has a 'createdAt' field)
    const messageTime = user.lastMessageAt ? format(new Date(user.lastMessageAt), 'hh:mm a') : '';

    const userId = user.participants?._id || user._id;
    const profilePicture = user.participants?.profilePicture || user.profilePicture;
    const username = user.participants?.username || user.username;

    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.includes(userId);

    return (
        <div onClick={() => getMessages(user)} className='flex border w-full cursor-pointer'>
            <div className='flex items-center relative'>
                <img
                    src={profilePicture} alt=""
                    className='h-12 rounded-full m-2'
                />
                {isOnline && (
                    <span className='absolute top-4 right-2 bg-green-500 h-3 w-3 rounded-full border-2 border-white'></span>
                )}
            </div>
            <div className='my-3 w-9/12'>
                <div className='flex justify-between'>
                    <h1 className='text-lg font-semibold'>
                        {username}
                    </h1>
                    {unreadCount > 0 && (
                        <span className='rounded-full md:mr-1 bg-sky-600 px-2 mr-4'>
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className='flex justify-between text-ellipsis'>
                    <p>
                        {user.lastMessage?.length > 20 ? `${user.lastMessage?.substring(0, 23)}...` : user.lastMessage}
                    </p>
                    <p className='text-xs text-gray-300 text-right mt-2'>{messageTime}</p>
                </div>

            </div>
        </div>
    )
}

export default Conversation
