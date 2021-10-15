import { useContext } from "react"

import "./ChatMessageSent.scss"
import { UserContext } from "../../../context/Context"
import { UTILS } from "../../../CONST";


function ChatMessageSent({message}){
    const [user, setUser] = useContext(UserContext);

    return (
        <div className='ChatMessage ChatMessageSent'>
            <div className="description">
                <div className="text">
                    {message}
                </div>
            </div>
            <img src={user.profile_image || UTILS.RANDOM_IMAGE} alt="profile_image" className="profile-image" />
        </div>
    )
}

export default ChatMessageSent