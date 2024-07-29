import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserApi, unoFllowUserApi } from "../../utils/api/follow_api";
import { follow_user, unfollow_user } from "../../redux/slices/authSlice";

const FollowAndUnfollowButton = ({ data }) => {
    const following = useSelector(state => state.auth.userInfo.following);
    const dispatch = useDispatch();

    const [showUnfollowButton, setShowUnfollowButton] = useState(false);

    useEffect(() => {
        // Check if the user is already followed and set the state accordingly
        console.log('use effect works...');
        setShowUnfollowButton(following.includes(data._id));
    }, [data._id, following]);

    const followUser = async (id) => {
        const response = await followUserApi(id)
        dispatch(follow_user(response));
        setShowUnfollowButton(true)
    }

    const unFollowUser = async (id) => {
        const response = await unoFllowUserApi(id)
        dispatch(unfollow_user(response));
        setShowUnfollowButton(false);
    }
    
    return (
        <div className="flex">
            {
                showUnfollowButton ? (
                    <button onClick={() => unFollowUser(data._id)} className='mr-4 text-base font-semibold hover:text-blue-500 text-primary-dark dark:text-primary-light'>
                        Following
                    </button>
                ) : (
                    <button onClick={() => followUser(data._id)} className='mr-4 text-base font-semibold text-blue-500 hover:text-primary-dark hover:dark:text-primary-light'>
                        Follow
                    </button>
                )
            }
        </div>
    )
}

export default FollowAndUnfollowButton
