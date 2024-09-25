import { useSelector } from 'react-redux'
 
const SingleChat = ({ message, selectedChat }) => {
    const userInfo = useSelector(state => state.auth?.userInfo);
    console.log('is id match:', userInfo._id, message._id)
    return (
        <div className={`flex ${userInfo._id === message.sender ? 'justify-end': 'justify-start'}  mb-4`} >
            <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words'>
                <p>
                    { message.message }
                </p>
            </div>
            <img src={selectedChat.profilePicture} alt="User Profile" className='rounded-full h-8 w-8' />
        </div>
    )
}

export default SingleChat
