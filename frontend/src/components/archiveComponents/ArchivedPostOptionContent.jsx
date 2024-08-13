import { useState } from "react";
import { archivePostApi } from "../../utils/api/post_api";

const ArchivedPostOptionContent = ({ post, setShowOptions }) => {

    const removeFromArchive = async (id) => {
        try {
            await archivePostApi(id);
            setShowOptions(false)
        } catch (error) {
            console.log('Error removing from archive:', error);
        }
    }

    return (
        <div >
            <button onClick={() => handleAction('delete')} className='text-secondary-light font-semibold border-b dark:border-gray-500 py-2 w-full hover:scale-105'>
                Delete
            </button>
            <button onClick={() => removeFromArchive(post._id)} className='text-green-500 font-semibold border-b dark:border-gray-500 py-2 w-full hover:scale-105'>
                Add to Profile 
            </button>
        </div>
    )
}

export default ArchivedPostOptionContent
