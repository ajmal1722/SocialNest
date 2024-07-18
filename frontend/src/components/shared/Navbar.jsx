import { FaSearch, FaPlus } from 'react-icons/fa'
import DarkMode from './DarkMode'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='fixed top-0 w-full z-50 flex items-center justify-between lg:px-20 md:px-14 sm:px-4 px-1 text-white border-b dark:border-gray-500 bg-primary-light dark:bg-primary-dark h-16 sm:h-20'>
            <div>
                <h1 className='text-2xl text-secondary-light cursor-pointer font-bold'>
                    Social
                    <span className='text-primary-dark font-extrabold dark:text-primary-light'>
                        Nest
                    </span>
                </h1>
            </div>
            <div className='sm:flex gap-2 items-center bg-gray-300 px-3 p-2 rounded-full w-2/6 hidden dark:bg-secondary-dark'>
                <FaSearch className='text-gray-600 dark:text-white' />
                <input type="text"
                    placeholder='Search...'
                    className='focus:outline-none w-full bg-gray-300 text-gray-500 dark:bg-secondary-dark dark:text-white'
                />
            </div>
            <div className='flex gap-2'>
                <NavLink to={'/create-post'}>
                    <button className='flex gap-3 items-center text-md font-semibold bg-ternary-dark hover:bg-primary-dark sm:px-6 px-3 p-2 rounded-full mx-3 dark:bg-secondary-dark dark:hover:bg-primary-dark'>
                        <FaPlus />
                        Create
                    </button>
                </NavLink>
                <DarkMode />
            </div>
        </div>
    )
}

export default Navbar