import { useState } from "react";
import { Input } from 'antd'
import ListSearchedUser from "../components/searchUser/ListSearchedUser";

const SearchUserPage = () => {
    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-7 mb-16 md:mb-1'>
            <div className='flex justify-center'>
                <Input 
                    className='w-full sm:w-10/12 lg:w-4/6'
                />
            </div>
            <div className="flex justify-center">
            <ListSearchedUser />
            </div>
        </div>
    )
}

export default SearchUserPage
