import { useState, useEffect } from "react";
import { BsSave2, BsSave2Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import { savePostApi, isPostSavedApi, fetchCollectionsApi } from "../../utils/api/post_api";
import ReusableModal from "../reusable/ReusableModal";
import SaveModalContentData from "./SaveModalContentData";

const SavePost = ({ post }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [collections, setCollections] = useState([]);
    const [collectionName, setCollectionName] = useState('');

    useEffect(() => {
        const fetchIsSaved = async () => {
            try {
                const response = await isPostSavedApi(post._id);
                setIsSaved(response.isSaved);
                setCollectionName(response.collectionName)
            } catch (error) {
                console.error('Error fetching saved status:', error);
            }
        };

        fetchIsSaved();
    }, [post._id, isSaved]);

    const openModal = async () => {
        try {
            const response = await fetchCollectionsApi();
            setCollections(response.collections); 
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching collections:', error);
            toast.error('Failed to unsave post');
        }
    };

    const handleSave = async () => {
        if (isSaved) {
            try {
                const response = await savePostApi({ postId: post._id, collectionName });
                if (response.status === 'Success') {
                    setIsSaved(false);
                    toast.success(response.message)
                }
            } catch (error) {
                console.error('Error unsaving post:', error);
            }
        } else {
            openModal();
        }
    };

    // Sending modalContent as props to CommentListing Component
    const saveModalContentDataWithProps = () => {
        return <SaveModalContentData 
            post={post} 
            collections={collections}
            setIsSaved={setIsSaved}
            setModalVisible={setModalVisible}
        />
    };

    return (
        <div className='cursor-pointer'>
            {isSaved ?
                <BsSave2Fill onClick={handleSave} /> :
                <BsSave2 onClick={handleSave} />}

            {modalVisible && (
                <ReusableModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    Content={saveModalContentDataWithProps}
                />
            )}
        </div>
    );
};

export default SavePost;