import { useState } from "react";
import Input from "antd/es/input/Input"
import { IoIosSend } from "react-icons/io";
import EmojiSelector from "../reusable/EmojiSelector";

const MessageBoxFooter = ({ handleSubmit, messageInput, setMessageInput }) => {

    const isButtonDisabled = messageInput.trim().length === 0;

    const addEmoji = (emoji) => {
        setMessageInput((prevMessage) => prevMessage + emoji.native);
    };

    return (
        <div className='p-4 border-t'>
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
        </div>
    )
}

export default MessageBoxFooter
