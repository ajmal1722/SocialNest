import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";

const CommentListing = ({ post, commentContent, addNewComment }) => {
    console.log('debg:', commentContent);

    return (
        <div className='h-full border dark:border-gray-500 text-primary-dark dark:text-primary-light'>
            <div className='overflow-y-auto min-h-52'>
                {commentContent.length > 0 ?
                    commentContent.map((item, index) => (
                        <SingleComment key={index} comments={item} />
                    )) : <div className="flex justify-center items-center h-48">
                        <h1 className="text-gray-500 text-xl font-semibold">
                            No Comments yet.
                        </h1>
                    </div> 
                }
            </div>
            <div className="sticky bottom-0 left-0 right-0 border-t bg-white dark:bg-primary-dark p-2">
                <CommentForm name={'comment'} post={post} addNewComment={addNewComment} />
            </div>
        </div>
    );
};

export default CommentListing;