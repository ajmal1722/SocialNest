import { FaFacebookMessenger } from "react-icons/fa";

const NoMessage = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div >
                <FaFacebookMessenger className="text-5xl mx-auto my-2" />
                <p>
                    Start conversation with your friends
                </p>
            </div>
        </div>
    )
}

export default NoMessage
