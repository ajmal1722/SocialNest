import { useState, useEffect } from 'react';
import { Space, Table, Tag, Avatar, Image, Button } from 'antd';
import { fetchAllUsersApi } from '../../utils/api/admin_api';
import ReusableModal from '../../components/reusable/ReusableModal';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetchAllUsersApi();
            if (response) {
                // Add a unique key for each row 
                const dataWithKeys = response.users.map(user => ({ ...user, key: user._id }));
                setUsers(dataWithKeys);
            }
        };

        fetchUsers();
    }, []);

    const banUser = async (id) => {
        console.log(id)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button 
                        className='bg-sky-500 text-white font-semibold'
                        onClick={() => setShowModal(true)}
                    >
                        View User
                    </Button>
                    <Button onClick={() => banUser(record._id)}>
                        Ban User
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <>
            <Table columns={columns} dataSource={users} />
            <ReusableModal 
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                // Content={}
            />
        </>
    )
}

export default AdminUserManagement
