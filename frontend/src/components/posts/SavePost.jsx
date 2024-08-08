import { useState, useEffect } from "react";
import { BsSave2, BsSave2Fill } from "react-icons/bs";
import { savePostApi, isPostSavedApi } from "../../utils/api/post_api";

const SavePost = ({ post }) => {
    const [isSaved, setIsSaved] = useState(false);

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
    }, [])

    const handleSave = async () => {
        const response = await savePostApi({postId: post._id})
        setIsSaved(prev => !prev)
    }

    return (
        <div className='cursor-pointer'>
            {isSaved ?
                <BsSave2Fill onClick={handleSave} /> :
                <BsSave2 onClick={handleSave} />}
        </div>
    )
}

export default SavePost