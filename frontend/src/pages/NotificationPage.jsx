import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeScrollableSection from "../components/homeComponents/HomeScrollableSection"
import RightSidbar from "../components/reusable/RightSidbar"
import SuggestionList from "../components/notificationPageComponents/SuggestionList"
import { fetchSuggestionsApi } from "../utils/api/follow_api";

const NotificationPage = () => {
    const [suggestions, setSuggestions] = useState([]);
    const userInfo = useSelector(state => state.auth.userInfo)
    console.log('userInfo..:', userInfo);

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
        <div>
            <HomeScrollableSection />
            <RightSidbar content={<SuggestionList suggestions={suggestions} />} />
        </div>
    )
}

export default NotificationPage