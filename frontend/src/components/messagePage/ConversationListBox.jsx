import ConversationListing from "./ConversationListing"

const ConversationListBox = ({ users }) => {
    return (
        <div className='h-full w-full sm:w-[600px] p-3'>
            <ConversationListing users={users} />
        </div>
    )
}

export default ConversationListBox
