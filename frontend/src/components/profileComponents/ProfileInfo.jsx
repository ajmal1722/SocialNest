import { useState } from "react";
import { useSelector } from "react-redux";
import { LiaUserEditSolid } from "react-icons/lia";
import { fetchFollowers, fetchFollowing } from "../../utils/api/follow_api";
import DateFormatter from "../reusable/DateFormatter";
import ContentDisplayingModal from "../reusable/ContentDisplayingModal";
import LogoutButton from "../authentication/LogoutButton";

const ProfileInfo = ({ profileData }) => {
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

    return (
        <div className="flex justify-center mt-5">
            <div>
                <div className='md:flex my-4 gap-2 items-center'>
                    <h1 className='text-2xl font-semibold mb-3 text-center mt-2'>
                        {name}
                    </h1>
                    {profileData ? '' 
                    : (<div className="flex gap-4">
                        <button className='text-lg md:px-6 px-3 py-1 md:ml-8 rounded-lg bg-ternary-dark dark:bg-secondary-dark text-white flex items-center gap-2'>
                            Edit Profile
                            <LiaUserEditSolid className="text-2xl" />
                        </button>
                        <LogoutButton />
                    </div>)}
                </div>
                <div className="flex justify-center md:block">
                    <div>
                        <h1 className='font-semibold mb-4 text-center md:text-start'>
                            <span className='font-bold text-2xl m-1'>@</span>
                            {username}
                        </h1>
                        <div className='flex gap-6 my-4 text-center'>
                            <div className='cursor-pointer'>
                                <h1 className='text-2xl font-bold'>
                                    0
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