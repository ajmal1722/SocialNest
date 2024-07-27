import SingleUserSuggestion from "./SingleUserSuggestion"

const SuggestionList = ({ userInfo }) => {
    return (
        <div className="pb-4">
            <h1 className="text-2xl text-center my-7">
                Suggestions
            </h1>
            {
                userInfo.map(suggestion => (
                    <SingleUserSuggestion key={suggestion._id} data={suggestion} />
                ))
            }
        </div>
    )
}

export default SuggestionList