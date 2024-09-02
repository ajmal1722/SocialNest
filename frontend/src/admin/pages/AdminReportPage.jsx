import { useState, useEffect } from 'react';
import { Space, Table, Tag, Avatar, Image } from 'antd';
import { fetchReportApi } from '../../utils/api/admin_api';

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
    },
    // Uncomment and customize these columns if needed
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

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

    return (
        <Table columns={columns} dataSource={reportPost} />
    );
};

export default AdminReportPage;