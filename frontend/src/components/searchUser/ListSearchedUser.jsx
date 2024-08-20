import React from 'react';
import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';

const ContainerHeight = 400;

const ListSearchedUser = ({ userData }) => {
    return (
        <div className='w-full sm:w-10/12 lg:w-4/6 px-4'>
            {!userData ? (
                <div className='text-center text-gray-500 dark:text-gray-400 py-10'>
                    No results found
                </div>
            ) : (
                <List>
                    <VirtualList
                        data={userData}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="email"
                    >
                        {(item) => (
                            <List.Item key={item.email}>
                                <Link to={`/user/${item._id}`}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profilePicture || 'https://via.placeholder.com/150'} />}
                                        title={item.username}
                                        description={item.email}
                                    />
                                    <div>{item.bio}</div>
                                </Link>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            )}
        </div>
    );
}

export default ListSearchedUser;