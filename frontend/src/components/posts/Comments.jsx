import { useState } from "react";
import { FaRegComment } from 'react-icons/fa';
import CommentListing from "./CommentListing";
import { fetchCommentsApi } from "../../utils/api/post_api";
import ReusableModal from "../reusable/ReusableModal";

const Comments = ({ post }) => {
    const [commentContent, setCommentContent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = async (id) => {
        const response = await fetchCommentsApi(id)
        setCommentContent(response.comments)
        setIsModalVisible(true);
    }

    function closeModal () {
        setIsModalVisible(false)
    }

    // Sending post as props to CommentListing Component
    const CommentListingWithProps = () => <CommentListing post={post} commentContent={commentContent} />;
    return (
        <>
            <div className="cursor-pointer" onClick={() => openModal(post._id)}>
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
