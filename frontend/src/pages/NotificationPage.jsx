import { useEffect } from "react"
import HomeScrollableSection from "../components/homeComponents/HomeScrollableSection"
import RightSidbar from "../components/reusable/RightSidbar"
import SuggestionList from "../components/notificationPageComponents/SuggestionList"
import { fetchSuggestionsApi } from "../utils/api/follow_api"

const NotificationPage = () => {

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const response = await fetchSuggestionsApi();
                
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }

        fetchSuggestion()
    }, [])
    return (
        <div>
            <HomeScrollableSection />
            <RightSidbar content={<SuggestionList />} />
        </div>
    )
}

export default NotificationPage