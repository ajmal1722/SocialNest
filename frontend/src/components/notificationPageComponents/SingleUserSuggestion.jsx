import { useDispatch } from "react-redux";
import { followUserApi } from "../../utils/api/follow_api";
import { follow_user } from "../../redux/slices/authSlice";

const SingleUserSuggestion = ({ suggestion }) => {
    // console.log('sugg:', suggestion);
    const dispatch = useDispatch();

    const followUser = async (id) => {
        const response = await followUserApi(id)
        // dispatch(followUser(re))
        console.log('follow res:', response);
    }

    return (
        <div className='flex justify-between gap-2 border p-2 rounded-lg m-2'>
            <div className='flex gap-2'>
            <div>
                <img 
                    src={ suggestion.profilePicture } alt="" 
                    className='rounded-full h-12'
                />
            </div>
            <div className=''>
                <h1 className='font-semibold'>
                    { suggestion.username }
                </h1>
                <h2 className='text-sm font-thin mx-1'>
                { suggestion.name }
                </h2>
            </div>
            </div>
            <button onClick={() => followUser(suggestion._id)} className='mr-4 text-base font-semibold text-blue-500 hover:text-primary-dark hover:dark:text-primary-light'>
                Follow
            </button>
        </div>
    )
}

export default SingleUserSuggestion
