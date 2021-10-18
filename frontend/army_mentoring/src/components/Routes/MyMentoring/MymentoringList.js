import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateUserContextBySavedToken } from '../../../backend/auth';
import { UserContext } from '../../../context/Context';

import Subnavbar from '../Subnavbar';
import MyMentoringCard from "./MyMentoringCard";

import './MymentoringList.scss';

const MENU = [
    {id:'recent', desc:'최근 수강 강좌'},
    {id:'asMentee', desc:'멘티로서 진행중인 멘토링 목록'},
    {id:'asMentor', desc:'멘토로서 진행중인 멘토링 목록'},
]

function MymentoringList({match, history}){  
    const [user, setUser] = useContext(UserContext);
    if(Object.keys(user).length==0){
        history.push('/login');
    }
    useEffect(()=>{
        updateUserContextBySavedToken(setUser);
    }, [])

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    const participated_mentoring = user.participated_mentoring || [];
    const opened_mentoring = user.opened_mentoring || [];
    const recent_mentoring = participated_mentoring[participated_mentoring.length - 1];

    const getMentoringDetailUrlFromApiEndpoint = (apiEndpoint) => {
        let t = apiEndpoint.split('/');
        let mid = t[4];
        return `${match.url}/${mid}`;
    }

    return (
        <div className="MymentoringList">      
            <Subnavbar menu={MENU}></Subnavbar>

            <div className="recent-wrapper section" id="recent">
                <div className="recent">
                    <h2>최근 수강 강좌</h2>
                    <div className="card-wrapper">
                        {recent_mentoring 
                        ? (
                            <Link 
                            to={getMentoringDetailUrlFromApiEndpoint(recent_mentoring)} 
                            className="more">
                                <MyMentoringCard mentoringUrl={recent_mentoring} />
                            </Link>
                            ) 
                        : <p>참여한 멘토링이 없습니다!</p>
                        }
                    </div>
                </div>
            </div>

            <div className="section" id="asMentee">
                <h2>멘티로서 진행중인 멘토링 목록</h2>
                <div className="mentoring_cards">
                {
                    participated_mentoring.map((element, index) => {
                        return (
                            <Link 
                            to={getMentoringDetailUrlFromApiEndpoint(element)} 
                            key={index} 
                            className="more">
                                <MyMentoringCard mentoringUrl={element}  />
                            </Link>
                        )
                    })
                }
                </div>

            </div>

            <div className="section" id="asMentor">
                <h2>멘토로서 진행중인 멘토링 목록</h2>
                <div className="mentoring_cards">
                {
                    opened_mentoring.map((element, index) => {
                        let t = element.split('/');
                        let mid = t[4];
                        return (
                            <Link to={`${match.url}/${mid}`} key={index} className="more">
                                <MyMentoringCard mentoringUrl={element} />
                            </Link>
                            )
                    })
                }
                </div>
            </div>
        </div>
    )


}

export default MymentoringList;