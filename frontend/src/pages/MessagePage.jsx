import ChatBox from "../components/messagePage/ChatBox"
import ConversationListBox from "../components/messagePage/ConversationListBox";

const MessagePage = () => {
    return (
        <div className='min-h-[85vh] md:col-span-8 col-span-10 flex justify-center items-center'>
            <div className="flex justify-center items-center h-[75vh] md:h-[83vh] md:mt-3 md:mx-7">
                <ConversationListBox />
                <ChatBox />
            </div>
        </div>
    )
}

export default MessagePage
