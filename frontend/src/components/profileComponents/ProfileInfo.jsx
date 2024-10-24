import { useState } from "react";
import { useSelector } from "react-redux";
import { LiaUserEditSolid } from "react-icons/lia";
import { fetchFollowers, fetchFollowing } from "../../utils/api/follow_api";
import DateFormatter from "../reusable/DateFormatter";
import ContentDisplayingModal from "../reusable/ContentDisplayingModal";
import LogoutButton from "../authentication/LogoutButton";
import FollowAndUnfollowButton from "../reusable/FollowAndUnfollowButton";
import BlockAndUnBlockButton from "./BlockAndUnBlockButton";
import { Link } from "react-router-dom";

const ProfileInfo = ({ profileData, posts }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState([]);

    const userInfo = useSelector(state => state.auth.userInfo);
    const followers = profileData ? profileData.followers : userInfo.followers;
    const following = profileData ? profileData.following : userInfo.following;
    const createdAt = profileData ? profileData.createdAt : userInfo.createdAt;

    const showFollowers = async () => {
        try {
            const followersDetails = profileData
                ? await fetchFollowers(profileData._id)
                : await fetchFollowers(userInfo._id);
            setModalContent(followersDetails);
            setIsModalVisible(true);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    };

    const showFollowing = async () => {
        try {
            const followingDetails = profileData
                ? await fetchFollowing(profileData._id)
                : await fetchFollowing(userInfo._id);
            setModalContent(followingDetails);
            setIsModalVisible(true);
        } catch (error) {
            console.error("Error fetching following:", error);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalContent([]);
    };

    const name = profileData ? profileData.name : userInfo.name;
    const username = profileData ? profileData.username : userInfo.username;
    const userId = profileData ? profileData._id : userInfo._id;

    return (
        <div className="flex justify-center mt-5">
            <div>
                <div className='lg:flex my-4 gap-2 items-center'>
                    <h1 className='text-2xl font-semibold mb-3 text-center mt-2'>
                        {name}
                    </h1>
                    {userInfo._id === userId ?
                        <div className="flex gap-4">
                            <Link to='/edit-profile'>
                                <button className='text-lg md:px-6 px-3 py-1 md:ml-8 rounded-lg bg-ternary-dark dark:bg-secondary-dark text-white flex items-center gap-2'>
                                    Edit Profile
                                    <LiaUserEditSolid className="text-2xl" />
                                </button>
                            </Link>
                            <LogoutButton />
                        </div> : (
                            <div className="flex gap-2 justify-center px-5 text-white">
                                <FollowAndUnfollowButton
                                    data={profileData}
                                    followButtonStyle={'bg-blue-500 text-white font-semibold px-10 p-1 rounded-lg'}
                                    unFollowButtonStyle={'bg-ternary-dark dark:bg-secondary-dark text-white font-semibold px-10 p-1 rounded-lg '}
                                />
                                <BlockAndUnBlockButton data={profileData} />
                            </div>
                        )}
                </div>
                <div className="flex justify-center md:block">
                    <div>
                        <h1 className='font-semibold mb-4 text-center md:text-start mt-1'>
                            <span className='font-bold text-2xl m-1'>@</span>
                            {username}
                        </h1>
                        <div className="flex items-center md:justify-start justify-center gap-3 mb-1">
                            {userInfo._id === userId &&
                                <Link to='/archive'>
                                    <button className='px-3 p-1 rounded-lg bg-ternary-dark dark:bg-secondary-dark text-white flex items-center gap-2'>
                                        View Archive
                                    </button>
                                </Link>}
                        </div>
                        <div className='flex gap-6 mb-4 text-center'>
                            <div className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    {posts.length}
                                </h1>
                                <h1>
                                    Posts
                                </h1>
                            </div>
                            <div onClick={showFollowers} className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    {followers.length}
                                </h1>
                                <h1>
                                    Followers
                                </h1>
                            </div>
                            <div onClick={showFollowing} className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    {following.length}
                                </h1>
                                <h1>
                                    Following
                                </h1>
                            </div>
                        </div>
                        {createdAt && (
                            <div className="flex items-center gap-1 md:justify-normal justify-center">
                                Member since
                                <DateFormatter date={createdAt} />
                            </div>
                        )}
                    </div>
                </div>

                <ContentDisplayingModal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    content={modalContent}
                />
            </div>
        </div>
    );
}

export default ProfileInfo;