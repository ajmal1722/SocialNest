import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "antd/es/input/Input";
import { IoIosSend } from "react-icons/io";
import EmojiSelector from "../reusable/EmojiSelector";

const MessageBoxFooter = ({ handleSubmit, messageInput, setMessageInput, selectedChat }) => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        // Check if the current user is blocked by the selected chat participant
        const blockedUsers = selectedChat?.participants?.blockedUsers || [];
        setIsBlocked(blockedUsers.includes(userInfo._id));
    }, [selectedChat, userInfo._id]);

    const isButtonDisabled = messageInput.trim().length === 0;

    const addEmoji = (emoji) => {
        setMessageInput((prevMessage) => prevMessage + emoji.native);
    };

    return (
        <div className='p-4 border-t'>
            {isBlocked ? (
                <p className="text-center mx-5 text-sm font-semibold text-secondary-light dark:text-red-500">
                    You're blocked by this user. You're not allowed to send messages to this user.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="flex items-center">
                    <EmojiSelector onSelectEmoji={addEmoji} />
                    <Input
                        name="message"
                        placeholder="Type a message"
                        className="flex-grow focus:outline-none"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                        className={`ml-2 px-4 py-1 rounded ${isButtonDisabled ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        <IoIosSend className="text-xl" />
                    </button>
                </form>
            )}
        </div>
    );
};

export default MessageBoxFooter;