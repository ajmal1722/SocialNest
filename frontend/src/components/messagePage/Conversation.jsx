import { format } from 'date-fns'

const Conversation = ({ user, getMessages, unreadCount }) => {
    // Format the message time (assuming the message has a 'createdAt' field)
    const messageTime = user.lastMessageAt ? format(new Date(user.lastMessageAt), 'hh:mm a') : '';

    return (
        <div onClick={() => getMessages(user)} className='flex border w-full cursor-pointer'>
            <div className='flex items-center'>
                <img
                    src={user.participants.profilePicture} alt=""
                    className='h-12 rounded-full m-2'
                />
            </div>
            <div className='my-3 w-9/12'>
                <div className='flex justify-between'>
                    <h1 className='text-lg font-semibold'>
                        {user.participants.username}
                    </h1>
                    {unreadCount > 0 && (
                        <span className='rounded-full md:mr-1 bg-sky-600 px-2 mr-4'>
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className='flex justify-between'>
                    <p>
                        {user.lastMessage}
                    </p>
                    <p className='text-xs text-gray-300 text-right mt-2'>{messageTime}</p>
                </div>
            </div>
        </div>
    )
}

export default Conversation
