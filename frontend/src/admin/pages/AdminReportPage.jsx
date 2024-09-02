import { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchReportApi } from '../../utils/api/admin_api';

const columns = [
    {
        title: 'Post',
        dataIndex: 'post',
        key: 'post',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Reason',
        dataIndex: 'reasonForReport',
        key: 'reasonForReport',
    },
    {
        title: 'Reported By',
        dataIndex: 'age',
        key: 'reportedBy',
    },
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

const data = [
    {
        key: '1',
        post: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const AdminReportPage = () => {
    const [reportPost, setReportPost] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            const response = await fetchReportApi ();
            if (response) {
                setReportPost(response.reportedPosts)
            }
        }

        fetchReport()
    }, [])
    return (
        <Table columns={columns} dataSource={reportPost} />
    )
}

export default AdminReportPage;
