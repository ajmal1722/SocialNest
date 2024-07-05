import { FaSearch, FaPlus } from 'react-icons/fa'

const Navbar = () => {
    return (
        <div className='flex items-center lg:justify-around justify-between bg-green-300 text-white h-20 '>
            <div>
                <h1>
                    Social
                    <span>
                        Nest
                    </span>
                </h1>
            </div>
            <div>
                <FaSearch />
            </div>
            <div className='flex gap-2'>
                <button className='flex gap-3 items-center text-xl font-semibold bg-black px-6 p-2 rounded-full'>
                    <FaPlus />
                    Create
                </button>
            </div>
        </div>
    )
}

export default Navbar
