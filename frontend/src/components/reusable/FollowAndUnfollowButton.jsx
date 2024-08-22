import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { followUserApi, unoFllowUserApi } from "../../utils/api/follow_api";
import { follow_user, unfollow_user } from "../../redux/slices/authSlice";

const FollowAndUnfollowButton = ({ data, followButtonStyle, unFollowButtonStyle }) => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const following = userInfo.following;
    const dispatch = useDispatch();

    const [isOwner, setIsOwner] = useState(false);
    const [showUnfollowButton, setShowUnfollowButton] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data._id === userInfo._id) {
            setIsOwner(true)
        }
        
        // Check if the user is already followed and set the state accordingly
        setShowUnfollowButton(following.includes(data._id));
    }, [data._id, following]);

    const followUser = async (id) => {
        setLoading(true)
        const response = await followUserApi(id)
        
        if (response) {
            dispatch(follow_user(response));
            setLoading(false)
            setShowUnfollowButton(true);
        }
    }

    const unFollowUser = async (id) => {
        setLoading(true)
        const response = await unoFllowUserApi(id)

        if (response) {
            dispatch(unfollow_user(response));
            setLoading(false);
            setShowUnfollowButton(false);
        }
        
    }

    if (isOwner) {
        return null
    }
    
    return (
        <div className="flex">
            {loading ? (
                <div className='flex justify-center items-center mx-8'>
                    <Spin size="small" className="mx-auto" />
                </div> // Show loading spinner while the request is in progress
            ) : showUnfollowButton ? (
                <button
                    onClick={() => unFollowUser(data._id)}
                    className={unFollowButtonStyle ? unFollowButtonStyle : 'mr-4 text-base font-semibold hover:text-blue-500 text-primary-dark dark:text-primary-light'}
                >
                    Following
                </button>
            ) : (
                <button
                    onClick={() => followUser(data._id)}
                    className={followButtonStyle ? followButtonStyle : 'mr-4 text-base font-semibold text-blue-500 hover:text-primary-dark hover:dark:text-primary-light'}
                >
                    Follow
                </button>
            )}
        </div>
    )
}

export default FollowAndUnfollowButton