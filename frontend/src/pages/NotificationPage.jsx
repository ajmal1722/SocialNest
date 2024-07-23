import HomeScrollableSection from "../components/homeComponents/HomeScrollableSection"
import RightSidbar from "../components/reusable/RightSidbar"
import SuggestionList from "../components/notificationPageComponents/SuggestionList"

const NotificationPage = () => {
    return (
        <div>
            <HomeScrollableSection />
            <RightSidbar content={<SuggestionList />} />
        </div>
    )
}

export default NotificationPage
