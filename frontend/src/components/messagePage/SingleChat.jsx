import { useSelector } from 'react-redux'
 
const SingleChat = ({ message }) => {
    const userInfo = useSelector(state => state.auth?.userInfo) 
    return (
        <div className={`flex ${userInfo._id === message.sender ? 'justify-end': 'justify-start'}  mb-4`} >
            <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words'>
                <p>
                    { message.message }
                </p>
            </div>
            <img src="https://via.placeholder.com/30" alt="User Profile" className='rounded-full h-8 w-8' />
        </div>
    )
}

export default SingleChat
