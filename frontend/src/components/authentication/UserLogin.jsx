import React from 'react'
import { FaRegUser, FaLock } from "react-icons/fa";

const UserLogin = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className=' pt-10 pb-6 px-6 max-w-md min-w-80 shadow-2xl shadow-gray-500/40'>
                <div className="textcenter text-3xl my-8 text-center font-semibold">
                    Login
                </div>
                <form >
                    <div className='flex min-w-72 items-center border-b-2 text-gray-400 mb-6 '>
                        <FaRegUser />
                        <input 
                            type="text"
                            name='email'
                            placeholder='Username or email'
                            className='p-3 w-full focus:outline-none'
                        />
                    </div>
                    <div className='flex min-w-72 items-center border-b-2 text-gray-400 mb-6 '>
                        <FaLock />
                        <input 
                            type="password"
                            name='password'
                            placeholder='Password'
                            className='p-3 w-full focus:outline-none'
                        />
                    </div>
                    <button className='bg-blue-400 hover:bg-blue-500 text-white w-full rounded-full p-2 '>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserLogin
