import { useState, useEffect } from "react";
import { BsSave2, BsSave2Fill } from "react-icons/bs";
import { savePostApi, isPostSavedApi, fetchCollectionsApi } from "../../utils/api/post_api";
import ReusableModal from "../reusable/ReusableModal";
import SaveModalContentData from "./SaveModalContentData";

const SavePost = ({ post }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchIsSaved = async () => {
            try {
                const response = await isPostSavedApi(post._id);
                setIsSaved(response.isSaved);
            } catch (error) {
                console.error('Error fetching saved status:', error);
            }
        }

        fetchIsSaved();
    }, []);

    const openModal = async (id) => {
        const response = await fetchCollectionsApi();
        setModalVisible(true)
    }

    const closeModal = async (id) => {
        setModalVisible(true)
    }

    const handleSave = async () => {
        const response = await savePostApi({postId: post._id});
        if (response.status === 'Success') {
            setIsSaved(prev => !prev)
        } else {
            throw error
        }
        
    }

    return (
        <div className='cursor-pointer'>
            {isSaved ?
                <BsSave2Fill onClick={handleSave} /> :
                <BsSave2 onClick={handleSave} />}

            {/* <ReusableModal 
                isVisible={openModal}
                onClose={}
                Content={<SaveModalContentData />}
            /> */}
        </div>
    )
}

export default SavePost