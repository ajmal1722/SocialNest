import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import CreatePostPage from './CreatePostPage';
import { fetchPostByIdApi } from '../utils/api/post_api';

const EditPostLoader = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPostData = async () => {
            try {
                const data = await fetchPostByIdApi(id);
                console.log('data for edit:', data);
                
                setPostData(data.post);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post data:', error);
                setLoading(false);
            }
        };

        loadPostData();
    }, [id]);

    if (loading) {
        return (
            <div className='col-span-10 md:col-span-8'>
                <Spin size="large" className="flex justify-center items-center min-h-screen" />
            </div>
        )
    }

    return <CreatePostPage initialData={postData} />;
};

export default EditPostLoader;