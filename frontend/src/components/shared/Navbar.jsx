import { FaSearch, FaPlus } from 'react-icons/fa'
import DarkMode from './DarkMode'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between lg:px-20 md:px-14 sm:px-4 px-1 bg-emerald-400 text-white h-16 sm:h-20 dark:bg-gray-900'>
            <div>
                <h1 className='text-2xl cursor-pointer'>
                    Social
                    <span>
                        Nest
                    </span>
                </h1>
            </div>
            <DarkMode />
            <div className='flex gap-2 items-center bg-gray-400 px-3 p-2 rounded-lg'>
                <FaSearch />
                <input type="text" 
                    className='bg-slate-400 focus:outline-none sm:block hidden'
                />
            </div>
            <div className='flex gap-2'>
                <button className='flex gap-3 items-center text-md font-semibold bg-black px-6 p-2 rounded-full'>
                    <FaPlus />
                    Create
                </button>
            </div>
        </div>
    )
}

export default Navbar
