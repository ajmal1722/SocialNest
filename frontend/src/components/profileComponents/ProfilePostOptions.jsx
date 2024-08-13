import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../reusable/ConfirmationModal";

const ProfilePostOptions = ({ setShowOptions, postId, handleDelete, handleArchive, content }) => {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');

    const handleAction = (actionType) => {
        setAction(actionType);
        setShowModal(true);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black  bg-opacity-50 text-center">
            <div className="bg-primary-light dark:bg-secondary-dark max-w-sm w-full rounded-lg p-3 relative text-primary-dark dark:text-primary-light">
                <button onClick={() => handleAction('delete')} className='text-secondary-light font-semibold border-b dark:border-gray-500 py-2 w-full hover:scale-105'>
                    Delete
                </button>
                {content ?
                    content :
                    <div>
                        <Link to={`/edit-post/${postId}`}>
                            <button className='border-b dark:border-gray-500 py-3 w-full hover:scale-105'>
                                Edit
                            </button>
                        </Link>
                        <button onClick={() => handleAction('archive')} className='border-b dark:border-gray-500 py-3 w-full hover:scale-105'>
                            Archive
                        </button>
                    </div>}
                <button onClick={() => setShowOptions(false)} className=' font-semibold py-2 w-full hover:scale-105'>
                    Cancel
                </button>
            </div>
            <ConfirmationModal
                showModal={showModal}
                setShowModal={setShowModal}
                setShowOptions={setShowOptions}
                postId={postId}
                handleDelete={handleDelete}
                handleArchive={handleArchive}
                action={action}
            />
        </div>
    )
}

export default ProfilePostOptions