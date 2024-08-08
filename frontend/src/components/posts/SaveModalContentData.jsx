import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const SaveModalContentData = () => {
    const [showInput, setShowInput] = useState(false);


    return (
        <div className='border'>
            <button className='w-full mx-2 '>
                <FaPlus />
                <span className='text-xl'>
                    Add New Collection
                </span>
            </button>
        </div>
    )
}

export default SaveModalContentData
