import { useState } from "react"
import { savePostApi } from "../../utils/api/post_api"

const ListCollections = ({ post, collections }) => { 

    const handleSave = async (collectionName) => {
        const response = await savePostApi({ postId: post._id, collectionName });
        if (response) {
            console.log('post saved successfully...,', response);
        }
    }

    return (
        <div className='mt-6'>
            {
                collections.map(collection => (
                    <div 
                        onClick={() => handleSave(collection.collectionName)}
                        className='flex justify-center border hover:scale-105 cursor-pointer'
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

