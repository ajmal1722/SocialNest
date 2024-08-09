import { toast } from "react-toastify";
import { savePostApi } from "../../utils/api/post_api"

const ListCollections = ({ post, collections, setIsSaved, setModalVisible }) => { 

    const handleSave = async (collectionName) => {
        const response = await savePostApi({ postId: post._id, collectionName });
        if (response) {
            console.log('post saved successfully...,', response);
            setIsSaved(true);
            setModalVisible(false);
            toast.success(response.message)
        }
    }

    return (
        <div className='mt-6'>
            {
                collections.map(collection => (
                    <div 
                        onClick={() => handleSave(collection.collectionName)}
                        className='flex justify-center border hover:scale-105 cursor-pointer mb-1'
                    >
                        <h1 className='my-2' >
                            { collection.collectionName }
                        </h1>
                    </div>
                ))
            }
        </div>
    )
}

export default ListCollections

