import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationListing from "../components/notificationPageComponents/NotificationListing";
import RightSidbar from "../components/reusable/RightSidbar"
import SuggestionList from "../components/notificationPageComponents/SuggestionList"
import { fetchSuggestionsApi } from "../utils/api/follow_api";

const NotificationPage = () => {
    const [suggestions, setSuggestions] = useState([]);
    const userInfo = useSelector(state => state.auth.userInfo)
    // console.log('userInfo..:', userInfo.following.length);

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const response = await fetchSuggestionsApi();
                setSuggestions(response.suggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }

        fetchSuggestion()
    }, [])
    return (
        <div className="min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1">
            <NotificationListing />
            <RightSidbar content={<SuggestionList userInfo={suggestions} />} />
        </div>
    )
}

export default NotificationPage