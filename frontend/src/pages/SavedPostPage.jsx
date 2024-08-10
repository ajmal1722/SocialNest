import { useState, useEffect } from "react";
import { fetchCollectionsApi } from "../utils/api/post_api";
import ListCollections from "../components/savedCollections/ListCollections";

const SavedPostPage = () => {
    const [collections, setCollections] = useState([])
    useEffect(() => {
        const getCollections = async () => {
            try {
                const response = await fetchCollectionsApi();
                setCollections(response.collections)
                // console.log('response:', response);
            } catch (error) {
                console.log('Error fetching collections:', error);
            }
        }

        getCollections()
    }, [])
    
    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <h1>Saved Posts</h1>
            <ListCollections collections={collections} /> 
        </div>
    )
}

export default SavedPostPage
