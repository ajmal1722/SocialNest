
const UserNotFound = () => {
    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <div className='sm:flex gap-10 lg:gap-20 md:mx- sm:mx-5 mx-2 justify-center'>
                <img 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" 
                    className='rounded-full w-auto max-w-52 object-cover mt-10'
                />
                <div className="flex justify-center items-center ">
                    <button className="bg-gray-500 text-white px-5 p-1 rounded-md">
                        User not found
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserNotFound