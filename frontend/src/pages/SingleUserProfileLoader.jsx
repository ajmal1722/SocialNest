import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { singleUserDetailsApi } from "../utils/api/user_api";
import ProfilePage from "./ProfilePage";

const SingleUserProfileLoader = () => {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const result = await singleUserDetailsApi(id);
                setProfileData(result);
            } catch (error) {
                console.log('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) {
        return (
            <div className='col-span-10 md:col-span-8'>
                <Spin size="large" className="flex justify-center items-center min-h-screen" />
            </div>
        );
    }

    return (
        <ProfilePage initialPosts={profileData?.posts} initialUser={profileData?.user} />
    );
};

export default SingleUserProfileLoader;