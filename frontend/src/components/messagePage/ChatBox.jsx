import { useState } from "react";
import Input from "antd/es/input/Input";
import EmojiSelector from "../reusable/EmojiSelector";

const ChatBox = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submit behavior
        if (message.trim().length > 0) {
            alert('Message submitted: ' + message);  // Handle message submission logic here
            setMessage('');  // Clear the message input after sending
        }
    }

    const isButtonDisabled = message.trim().length === 0;

    const addEmoji = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.native);
    };

    return (
        <div className='w-full md:h-[85vh] h-[75vh] flex flex-col'>
            <div className='bg-gray-300 dark:bg-secondary-dark m-5 h-[600px] flex flex-col rounded-md'>
                {/* Top Section: Profile Image and Username */}
                <div className='flex items-center p-4 border-b'>
                    <img src="https://via.placeholder.com/40" alt="Profile" className='rounded-full h-10 w-10' />
                    <span className='ml-4 font-semibold'>Username</span>
                </div>

                {/* Middle Section: Chat Content */}
                <div className='flex-1 p-4 overflow-y-auto'>
                    {/* Example chat messages */}
                    <div className='flex mb-4'>
                        <img src="https://via.placeholder.com/30" alt="Sender Profile" className='rounded-full h-8 w-8' />
                        <div className='text-black ml-2 p-2 bg-gray-200 rounded-md max-w-[70%] break-words'>
                            <p>
                                Hey there! How's it going? This is a really long message that should break into multiple lines if it exceeds the container's width.
                            </p>
                        </div>
                    </div>

                    <div className='flex justify-end mb-4'>
                        <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words'>
                            <p>
                                I'm good! What about you? This is another long message that will wrap onto new lines if it is too long for the message container.
                            </p>
                        </div>
                        <img src="https://via.placeholder.com/30" alt="User Profile" className='rounded-full h-8 w-8' />
                    </div>
                </div>

                {/* Bottom Section: Input for Typing Messages */}
                <div className='p-4 border-t'>
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <EmojiSelector onSelectEmoji={addEmoji} />
                        <Input
                            name="message"
                            placeholder="Type a message"
                            className="flex-grow focus:outline-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} 
                        />
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className={`ml-2 px-4 py-1 rounded ${isButtonDisabled ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;