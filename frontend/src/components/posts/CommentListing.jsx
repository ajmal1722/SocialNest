import { useState } from "react";
import { Input } from "antd";
import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";

const CommentListing = () => {
    const commentContent = [
        'sample content', 
        'sample comment content 1..', 
        'something here', 
        'lasdkfjlaksjfalksdfjal', 
        'samplelskjdlkfjs teldjlskjf'
    ];

    return (
        <div className='h-full border dark:border-gray-500 text-primary-dark dark:text-primary-light'>
            <div className='overflow-y-auto'>
                {commentContent.map((item, index) => (
                    <SingleComment key={index} comments={item} />
                ))}
            </div>
            <div className="sticky bottom-0 left-0 right-0 border-t bg-white dark:bg-primary-dark p-2">
                <CommentForm name={'comment'} />
            </div>
        </div>
    );
};

export default CommentListing;