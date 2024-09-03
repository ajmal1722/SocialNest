import { useState, useEffect } from 'react';
import { Space, Table, Tag, Avatar, Image, Button } from 'antd';
import { fetchAllUsersApi } from '../../utils/api/admin_api';

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
        dataIndex: 'reasonForReport',
        key: 'reason',
    }
]

const data = [{}]

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <Table columns={columns} dataSource={users} />
    )
}

export default AdminUserManagement
