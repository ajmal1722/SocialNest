import { useState } from "react";
import { useDispatch } from "react-redux";
import { followUserApi } from "../../utils/api/follow_api";
import { follow_user } from "../../redux/slices/authSlice";

const SingleUserSuggestion = ({ suggestion }) => {
    const [showUnfollowButton, setShowUnfollowButton] = useState(false)
    const dispatch = useDispatch();

    const followUser = async (id) => {
        const response = await followUserApi(id)
        dispatch(follow_user(response));
        setShowUnfollowButton(true)
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
            {
                showUnfollowButton ? (
                    <button  className='mr-4 text-base font-semibold hover:text-blue-500 text-primary-dark dark:text-primary-light'>
                        Unfollow
                    </button>
                ) : (
                    <button onClick={() => followUser(suggestion._id)} className='mr-4 text-base font-semibold text-blue-500 hover:text-primary-dark hover:dark:text-primary-light'>
                        Follow
                    </button>
                )
            }
            
        </div>
    )
}

export default SingleUserSuggestion
