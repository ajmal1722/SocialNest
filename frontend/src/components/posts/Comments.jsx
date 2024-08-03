import { useState } from "react";
import { FaRegComment } from 'react-icons/fa';
import CommentListing from "./CommentListing";
import ReusableModal from "../reusable/ReusableModal";

const Comments = ({ post }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    function closeModal () {
        setIsModalVisible(false)
    }

    // Sending post as props to CommentListing Component
    const CommentListingWithProps = () => <CommentListing post={post} />;
    return (
        <>
            <div className="cursor-pointer" onClick={() => setIsModalVisible(true)}>
                <FaRegComment />
            </div>
            <ReusableModal
                isVisible={isModalVisible}
                onClose={closeModal}
                Content={CommentListingWithProps}
            />
        </>
    )
}

export default Comments
