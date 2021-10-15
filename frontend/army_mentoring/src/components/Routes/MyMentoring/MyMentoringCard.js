import {useContext, useEffect, useState} from 'react';

import { updateUserContextBySavedToken } from '../../../backend/auth';
import { getFromUrl } from '../../../backend/common';
import { UserContext } from '../../../context/Context';

import "./MyMentoringCard.scss";

function MyMentoringCard({mentoringUrl}){
    const [mentoring, setMentoring] = useState(null);
    const [user, setUser] = useContext(UserContext);
    
    useEffect(()=>{
        (async ()=>{
            await updateUserContextBySavedToken(setUser);
            const requestedMentoring= (await getFromUrl(mentoringUrl)).data;
            setMentoring(requestedMentoring);
        })();
    }, [mentoringUrl]);
 
    if(mentoring){
        const {thumbnail, title, mentees} = mentoring;
    
        return (
            <div className="MyMentoringCard">
                <img src={thumbnail} alt="mentoring thumbnail" />
                <div className="text-container">
                    <div className="title">{title}</div>
                    <div className="participants">
                        {mentees.length}명이 참가중
                    </div>
                </div>
            </div>
        )
    }else {
        return (
            <div className="MyMentoringCard"></div>
        )
    }
};


export default MyMentoringCard;