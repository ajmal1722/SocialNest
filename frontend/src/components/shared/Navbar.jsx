import { FaSearch, FaPlus } from 'react-icons/fa'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between lg:px-20 md:px-14 sm:px-4 px-1 bg-green-300 text-white h-20 '>
            <div>
                <h1 className='text-2xl cursor-pointer'>
                    Social
                    <span>
                        Nest
                    </span>
                </h1>
            </div>
            <div className='flex gap-2 items-center '>
                <FaSearch />
                <input type="text" 
                
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
