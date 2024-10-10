import { useState } from "react";
import ConversationListing from "./ConversationListing";
import { searchUserApi } from "../../utils/api/user_api";

const ConversationListBox = ({ users, getMessages, setSelectedChat, unreadCounts, setUnreadCounts }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    const handleChange = async (e) => {
        setSearchValue(e.target.value.toLowerCase());
        const response = await searchUserApi({ searchText: e.target.value.toLowerCase().trim() });
        setSearchedUsers(response);
    };

    return (
        <div className="w-full sm:w-[600px] h-[70vh] bg-gray-300 dark:bg-secondary-dark rounded-md mx-3 mr-1 md:mr-6 p-3 flex flex-col">
            <div className="flex-shrink-0">
                <input
                    type="text"
                    className="w-full p-1 px-3 my-2 rounded-md bg-primary-light dark:bg-primary-dark border"
                    placeholder="Search a user"
                    value={searchValue}
                    onChange={handleChange}
                />
            </div>
            <div className="flex-grow overflow-y-auto">
                <ConversationListing
                    users={searchValue.trim().length > 0 ? searchedUsers : users}
                    getMessages={getMessages}
                    setSelectedChat={setSelectedChat}
                    unreadCounts={unreadCounts}
                    setUnreadCounts={setUnreadCounts}
                />
            </div>
        </div>
    );
};

export default ConversationListBox;