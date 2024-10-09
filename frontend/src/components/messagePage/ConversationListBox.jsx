import { useState } from "react";
import ConversationListing from "./ConversationListing";
import { searchUserApi } from "../../utils/api/user_api";

const ConversationListBox = ({ users, getMessages, setSelectedChat, unreadCounts, setUnreadCounts }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([])

    const handleChange = async (e) => {
        setSearchValue(e.target.value.toLowerCase());
        const response = await searchUserApi({ searchText: e.target.value.toLowerCase().trim() });
        setSearchedUsers(response);
    };

    return (
        <div className='h-full w-full sm:w-[600px] p-3'>
            <div>
                <input 
                    type="text"
                    className="w-full p-1 px-3 my-2 rounded-md bg-primary-light dark:bg-primary-dark border"
                    placeholder="Search a user"
                    value={searchValue}
                    onChange={handleChange}
                />
            </div>
            <ConversationListing 
                users={searchValue.trim().length > 0 ? searchedUsers : users}
                getMessages={getMessages} 
                setSelectedChat={setSelectedChat}
                unreadCounts={unreadCounts}
                setUnreadCounts={setUnreadCounts}
            />
        </div>
    );
};

export default ConversationListBox;