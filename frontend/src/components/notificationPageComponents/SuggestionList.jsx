import SingleUserSuggestion from "./SingleUserSuggestion"

const SuggestionList = ({ suggestions }) => {
    return (
        <div className="pb-4">
            <h1 className="text-2xl text-center my-7">
                Suggestions
            </h1>
            {
                suggestions.map(suggestion => (
                    <SingleUserSuggestion key={suggestion._id} suggestion={suggestion} />
                ))
            }
        </div>
    )
}

export default SuggestionList
