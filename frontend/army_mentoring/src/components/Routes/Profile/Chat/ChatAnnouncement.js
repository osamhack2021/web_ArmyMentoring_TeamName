import "./ChatAnnouncement.scss";

function ChatAnnouncement({message}){
    return (
        <div className="ChatAnnouncement">
            <div className="background-box">
                {message}
            </div>
        </div>
    )
}

export default ChatAnnouncement;