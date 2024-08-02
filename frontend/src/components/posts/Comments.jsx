import { useState } from "react";
import { FaRegComment } from 'react-icons/fa';
import CommentListing from "./CommentListing";
import ReusableModal from "../reusable/ReusableModal";

const Comments = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    function closeModal () {
        setIsModalVisible(false)
    }
    return (
        <>
            <div className="cursor-pointer" onClick={() => setIsModalVisible(true)}>
                <FaRegComment />
            </div>
            <ReusableModal
                isVisible={isModalVisible}
                onClose={closeModal}
                Content={CommentListing}
            />
        </>
    )
}

export default Comments
