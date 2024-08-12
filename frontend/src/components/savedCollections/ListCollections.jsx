import { useState } from 'react';
import { Card } from 'antd';
const { Meta } = Card;
import { fetchSavedPostsApi } from '../../utils/api/post_api';
import ListSavedPosts from './ListSavedPosts';

const ListCollections = ({ collections }) => {
    const [savedPosts, setSavedPosts] = useState([]);
    const [showSavedPosts, setShowSavedPosts] = useState(false);

    const fetchSavedPosts = async (id) => {
        try {
            const response = await fetchSavedPostsApi(id);
            console.log('response in fron end:', response.savedPosts);
            setSavedPosts(response.savedPosts);
            setShowSavedPosts(true)
        } catch (error) {
            console.log('Error fetching saved posts:', error);
        }
    }

    return (
        <div className='flex flex-wrap justify-center'>
            {showSavedPosts ?
                <ListSavedPosts savedPosts={savedPosts} /> :
                collections.length > 0 ? (
                    collections.map((collection) => (
                        <div
                            key={collection._id}
                            className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 my-1 cursor-pointer'
                            onClick={() => fetchSavedPosts(collection._id)}
                        >
                            <Card
                                className='hover:scale-105 transition-transform duration-300'
                                cover={
                                    <img
                                        alt={collection.collectionName}
                                        src={collection.imageUrl || "https://onlinetools.com/images/examples-onlineimagetools/empty-translucent-image.png"}
                                    />
                                }
                            >
                                <Meta title={collection.collectionName} />
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No collections found.</p>
                )}
        </div>
    );
};

export default ListCollections;