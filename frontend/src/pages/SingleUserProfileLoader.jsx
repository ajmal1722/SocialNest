import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { singleUserDetailsApi } from "../utils/api/user_api";
import ProfilePage from "./ProfilePage";
import UserNotFound from "./UserNotFound"; // Import UserNotFound component

const SingleUserProfileLoader = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get user ID from the URL parameters
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); // New state to handle user not found

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(false); // Reset error state before fetching
                const result = await singleUserDetailsApi(id);
                setProfileData(result);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(true); // Set error state when fetching fails
            } finally {
                setLoading(false); // Always stop loading regardless of success or failure
            }
        };

        fetchUserData();
    }, [id]);

    // Show loading spinner while fetching data
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    // Show UserNotFound component if user data could not be fetched
    if (error) {
        return <UserNotFound />;
    }

    // Render the profile page if data is successfully fetched
    return (
        <ProfilePage initialPosts={profileData?.posts} initialUser={profileData?.user} />
    );
};

export default SingleUserProfileLoader;