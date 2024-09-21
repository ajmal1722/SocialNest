import ChatBox from "../components/messagePage/ChatBox"
import MessagePeopleBox from "../components/messagePage/MessagePeopleBox"

const MessagePage = () => {
    return (
        <div className='min-h-[85vh] md:col-span-8 col-span-10 flex justify-between'>    
            <ChatBox />
            <MessagePeopleBox />
        </div>
    )
}

export default MessagePage
