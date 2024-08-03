import { useState } from "react";
import { Input } from "antd";

const CommentForm = ({ name }) => {
    const [comment, setComment] = useState('');

    function handleChange (event) {
        setComment(event.target.value)
    }

    function handleSubmit (event) {
        event.preventDefault();
        alert(comment);
        setComment('');
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex items-center">
                    <input 
                        name={name}
                        placeholder="Add a comment..."
                        className="flex-grow" 
                        value={comment}
                        onChange={handleChange}
                    
                    />
                    <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">
                        Post
                    </button>
                </form>
        </>
    );
};

export default CommentForm;