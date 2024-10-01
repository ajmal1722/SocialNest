import { useRef, useEffect } from "react";
import SingleChat from "./SingleChat";

const ChatListing = ({ chatMessages, setChatMessages, selectedChat }) => {
    const bottomRef = useRef(null); // Reference to the last message
    
    useEffect(() => {
        // Scroll to the bottom when the chatMessages change or when the component mounts
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages])
    return (
        <div className='flex-1 p-4 overflow-y-auto'>
            {/* Example chat messages */}
            {/* <div className='flex mb-4'>
                <img src="https://via.placeholder.com/30" alt="Sender Profile" className='rounded-full h-8 w-8' />
                <div className='text-black ml-2 p-2 bg-gray-200 rounded-md max-w-[70%] break-words'>
                    <p>
                        Hey there! How's it going? This is a really long message that should break into multiple lines if it exceeds the container's width.
                    </p>
                </div>
            </div> */}

            {chatMessages?.map((msg, index) => (
                <SingleChat key={index} message={msg} selectedChat={selectedChat} />
                // console.log('msg,', msg)
            ))}
            {/* This div will always scroll into view */}
            <div ref={bottomRef}></div>

            {/* <div className='flex justify-end mb-4'>
                <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words'>
                    <p>
                        I'm good! What about you? This is another long message that will wrap onto new lines if it is too long for the message container.
                    </p>
                </div>
                <img src="https://via.placeholder.com/30" alt="User Profile" className='rounded-full h-8 w-8' />
            </div> */}
        </div>
    )
}

export default ChatListing
