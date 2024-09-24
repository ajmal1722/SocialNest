import ConversationListing from "./ConversationListing"

const ConversationListBox = ({ users, getMessages }) => {
    return (
        <div className='h-full w-full sm:w-[600px] p-3'>
            <ConversationListing users={users} getMessages={getMessages} />
        </div>
    )
}

export default ConversationListBox
