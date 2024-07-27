import FollowAndUnfollowButton from "../reusable/FollowAndUnfollowButton";

const SingleUserSuggestion = ({ data }) => {
   
    return (
        <div className='flex justify-between gap-2 border p-2 rounded-lg m-2'>
            <div className='flex gap-2 text-primary-dark dark:text-primary-light'>
            <div>
                <img 
                    src={ data.profilePicture } alt="" 
                    className='rounded-full h-12'
                />
            </div>
            <div className=''>
                <h1 className='font-semibold'>
                    { data.username }
                </h1>
                <h2 className='text-sm font-thin mx-1'>
                { data.name }
                </h2>
            </div>
            </div>
            <FollowAndUnfollowButton data={data} />
        </div>
    )
}

export default SingleUserSuggestion