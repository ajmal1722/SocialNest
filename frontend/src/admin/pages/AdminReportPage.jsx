import { useState, useEffect } from 'react';
import { Space, Table, Tag, Avatar, Image, Button } from 'antd';
import { fetchReportApi } from '../../utils/api/admin_api';
import { deletePost } from '../../utils/api/post_api';

const AdminReportPage = () => {
    const [reportPost, setReportPost] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            const response = await fetchReportApi();
            if (response) {
                // Add a unique key for each row 
                const dataWithKeys = response.reportedPosts.map(post => ({ ...post, key: post._id }));
                setReportPost(dataWithKeys);
            }
        };

        fetchReport();
    }, []);

    const handleRemovePost = async (postId) => {
        try {
            const response = await deletePost(postId);  // Call API to remove the post
                // Update the state to reflect the removed post
                setReportPost((prevPosts) => 
                    prevPosts.map(post =>
                        post.post_details._id === postId
                            ? { ...post, post_details: { ...post.post_details, isDeleted: true } } // Update isDeleted to true
                            : post
                    )
                );
        } catch (error) {
            console.error("Error removing post:", error);
        }
    };

    const columns = [
        {
            title: 'Post',
            key: 'post',
            render: (record) => (
                <>
                    {record.post_details.content_type === 'Image' ?
                        (<>
                            <Image
                                src={record.post_details.image_url}
                                alt="Post"
                                width={50}
                            /> 
                            <h1>{record.post_details.caption}</h1>
                        </>) : (<>
                            <h1 className='font-semibold'>{record.post_details.caption}</h1>
                            <h1>
                                {record.post_details.blogContent}
                            </h1>
                        </>)
                    }
                </>
            ),
        },
        {
            title: 'Reason',
            dataIndex: 'reasonForReport',
            key: 'reason',
        },
        {
            title: 'Reported By',
            key: 'reportedBy',
            render: (record) => (
                <Space>
                    {record.user_details.profilePicture && (
                        <Avatar src={record.user_details.profilePicture} alt="Reporter" />
                    )}
                    <span>{record.user_details.username}</span>
                </Space>
            ),
        },{
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space>
                    {record.post_details.isDeleted ? (
                        <Button type="default" disabled>
                            Post Removed
                        </Button>
                    ) : (
                        <Tag 
                            color='volcano' 
                            onClick={() => handleRemovePost(record.post_details._id)}
                            className='p-1 px-3 cursor-pointer'
                        >
                            Remove Post
                        </Tag>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={reportPost} />
    );
};

export default AdminReportPage;