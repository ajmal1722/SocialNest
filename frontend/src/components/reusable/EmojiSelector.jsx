import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";

const EmojiSelector = ({ onSelectEmoji }) => {
    const [showEmojis, setShowEmojis] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowEmojis(!showEmojis)}
                className="text-2xl mr-1"
            >
                <MdEmojiEmotions />
            </button>
            {showEmojis && (
                <div className="absolute bottom-full mb-1 max-h-">
                    <Picker data={data} onEmojiSelect={onSelectEmoji} />
                </div>
            )}
        </div>
    );
};

export default EmojiSelector;