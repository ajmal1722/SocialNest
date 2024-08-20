import { useState, useCallback, useEffect } from "react";
import { Input } from 'antd';
import { searchUserApi } from "../utils/api/user_api";
import ListSearchedUser from "../components/searchUser/ListSearchedUser";

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const SearchUserPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchedUserData, setSearchedUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchUsers = useCallback(async (value) => {
        setLoading(true);
        try {
            const searchText = { searchText: value };
            const data = await searchUserApi(searchText);
            setSearchedUserData(data);
        } catch (error) {
            console.error('Error searching users:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        debounceSearch(value);
    };

    const debounceSearch = useCallback(debounce((value) => {
        if (value.trim()) {
            searchUsers(value);
        }
    }, 500), [searchUsers]);

    useEffect(() => {
        return () => {
            clearTimeout(debounceSearch);
        };
    }, [debounceSearch]);

    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-7 mb-16 md:mb-1'>
            <div className='flex justify-center'>
                <Input 
                    className='w-full sm:w-10/12 lg:w-4/6'
                    onChange={handleInputChange}
                    value={searchValue}
                    placeholder="Search users..."
                />
            </div>
            <div className="flex justify-center">
                <ListSearchedUser userData={searchedUserData} loading={loading} />
            </div>
        </div>
    );
};

export default SearchUserPage;