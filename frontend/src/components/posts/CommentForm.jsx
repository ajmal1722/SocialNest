import React, { useState } from 'react';
import { Input } from 'antd';
import { addCommentApi } from '../../utils/api/post_api';
import EmojiSelector from '../reusable/EmojiSelector';

const CommentForm = ({ post, addNewComment }) => {
    const [comment, setComment] = useState('');

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await addCommentApi({ comment, postId: post._id });
        if (response.status === 'Success') {
            addNewComment(response.comments);
        }
        setComment('');
    };

    const isButtonDisabled = comment.trim().length === 0;

    const addEmoji = (emoji) => {
        setComment((prevComment) => prevComment + emoji.native);
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center bg-white dark:bg-primary-dark">
                <EmojiSelector onSelectEmoji={addEmoji} />
                <Input
                    name="comment"
                    placeholder="Add a comment..."
                    className="flex-grow focus:outline-none"
                    value={comment}
                    onChange={handleChange}
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
    );
};

export default CommentForm;