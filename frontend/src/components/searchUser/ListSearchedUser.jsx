import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import { Link } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';

const ContainerHeight = 400;

const ListSearchedUser = ({ userData }) => {

    const appendData = () => {
        
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        // if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
        //     appendData();
        // }
    };

    return (
        <List className='w-full sm:w-10/12 lg:w-4/6 px-4'>
            <VirtualList
                data={userData}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
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
    )
}

export default ListSearchedUser