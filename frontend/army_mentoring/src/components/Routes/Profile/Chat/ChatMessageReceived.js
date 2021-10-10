import { useEffect, useState } from "react";

import { getFromUrl } from "../../../../backend/common";
import {UTILS} from '../../../../CONST';
import "./ChatMessageReceived.scss";

function ChatMessageReceived({userUrl, message}){
    const [user, setUser] = useState({});
    useEffect(()=>{
        getFromUrl(userUrl)
        .then(response=>{
            setUser(response.data);
        })
        .catch(e=>console.error(e.response.data));
    }, [userUrl]);

    return (
        <div className='ChatMessage ChatMessageReceived'>
            <img src={user.profile_image || UTILS.RANDOM_IMAGE} alt="profile_image" className="profile-image" />
            <div className="description">
                <div className="text">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default ChatMessageReceived