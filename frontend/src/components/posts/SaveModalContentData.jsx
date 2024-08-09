import { Input, Button } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { savePostApi } from "../../utils/api/post_api";
import ListCollections from "./ListCollections";

const SaveModalContentData = ({ post, collections, setIsSaved, setModalVisible }) => {
    const [showInput, setShowInput] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    const handleCreateCollection = async () => {
        if (collectionName.trim()) {
            const response = await savePostApi({ postId: post._id, collectionName })
            setCollectionName("");
            setShowInput(false);
            setModalVisible(false);
            setIsSaved(true)
            toast.success(response.message)
        }
    };

    return (
        <div className="p-4 border rounded-md bg-white">
            {!showInput ? (
               <>
               <div className='w-full flex justify-center'>
                    <button
                        className="flex justify-center items-center gap-2 p-2 px-4 bg-ternary-dark text-white rounded-full hover:bg-primary-dark hover:scale-105 transition-colors"
                        onClick={() => setShowInput(true)}
                    >
                        <FaPlus />
                        <span className="font-semibold">Add New Collection</span>
                    </button>
                </div>
                <ListCollections 
                    post={post} 
                    collections={collections} 
                    setIsSaved={setIsSaved}
                    setModalVisible={setModalVisible}
                />
               </> 
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateCollection();
                    }}
                    className="flex flex-col gap-4"
                >
                    <Input
                        placeholder="Enter collection name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        autoFocus
                        className="rounded-md"
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="primary"
                            onClick={handleCreateCollection}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => setShowInput(false)}
                            className="bg-gray-300 hover:bg-gray-400"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SaveModalContentData;