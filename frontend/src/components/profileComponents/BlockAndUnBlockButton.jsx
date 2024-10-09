import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { blockUserApi } from "../../utils/api/user_api";

const BlockAndUnBlockButton = ({ data }) => {
    const [isUserBlocked, setIsUserBlocked] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.auth.userInfo);

    // Check if the user is blocked on component mount
    useEffect(() => {
        if (userInfo?.blockedUsers?.includes(data._id)) {
            setIsUserBlocked(true);
        }
    }, [userInfo, data._id]);

    const handleBlockUser = async () => {
        setLoading(true); // Set loading to true before the API call
        try {
            const response = await blockUserApi(data._id);
            if (response) {
                setIsUserBlocked(!isUserBlocked); // Toggle the blocked state
            }
        } catch (error) {
            console.error('Error blocking/unblocking user:', error);
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    return (
        <button
            className={`${isUserBlocked ? 'bg-ternary-dark' : 'bg-secondary-light'} rounded-md px-5 font-semibold`}
            onClick={handleBlockUser}
            disabled={loading} // Disable the button while loading
        >
            {loading ? <Spin /> : isUserBlocked ? 'Unblock User' : 'Block User'}
        </button>
    );
};

export default BlockAndUnBlockButton;