import { useState, useEffect } from 'react';
import { Space, Table, Tag, Avatar, Image, Button, message } from 'antd';
import { fetchAllUsersApi, banUserApi } from '../../utils/api/admin_api';
import ReusableModal from '../../components/reusable/ReusableModal';
import UserDetails from '../components/reusable/UserDetails';
import ConfirmationModal from '../../components/reusable/ConfirmationModal'

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    const viewUser = async (user) => {
        setSelectedUser(user);
        setShowModal(true)
    }

    const openConfirmationModal = async (user) => {
        setSelectedUser(user)
        setShowConfirmationModal(true)
    }

    const banUser = async (id) => {
        const response = await banUserApi(id);
        if (response) {
            message.success(response.message);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, isBanned: true } : user
                )
            );
        }
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
                        onClick={() => viewUser(record)}
                    >
                        View User
                    </Button>
                    {record.isBanned ?
                        (<Tag 
                            color='volcano'
                            className='px-5 py-1 cursor-not-allowed'
                        >
                            Banned
                        </Tag>) : (
                        <Button onClick={() => openConfirmationModal(record)}>
                            Ban User
                        </Button>
                    )}
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
                Content={() => <UserDetails data={selectedUser} />}
            />
            <ConfirmationModal
                action={'ban user'}
                showModal={showConfirmationModal}
                setShowModal={setShowConfirmationModal}
                id={selectedUser?._id}
                message='Are you sure you want to ban this user?'
                handleBan={banUser}
            />
        </>
    )
}

export default AdminUserManagement