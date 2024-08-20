import { FaSearch, FaPlus } from 'react-icons/fa';
import DarkMode from './DarkMode';
import { Link } from 'react-router-dom';

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
            <div className='flex gap-2 md:gap-4'>
                <Link to={'/create-post'}>
                    <button className='flex gap-3 items-center text-md font-semibold bg-ternary-dark hover:bg-primary-dark sm:px-3 md:px-6 px-2 p-2 rounded-full mx-3 dark:bg-secondary-dark dark:hover:bg-primary-dark'>
                        <FaPlus />
                        <span className='hidden md:block text-xl '>
                        Create
                        </span>
                    </button>
                </Link>
                <Link to={'/search-user'} >
                    <div className='flex items-center bg-ternary-dark dark:bg-secondary-dark p-2 md:p-3 rounded-lg'>
                        <FaSearch className=' dark:text-white' />
                    </div>
                </Link>
                <DarkMode />
            </div>
        </div>
    );
};

export default Navbar;