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
    // {id:'waiting', desc:'신청 승낙 대기중인 멘토링 목록'}
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

    return (
        <div className="MymentoringList">      
            <Subnavbar menu={MENU}></Subnavbar>

            <div className="recent-container section" id="recent">
                <div className="recent">
                    <h2>최근 수강 강좌</h2>
                    <div className="card-wrapper">
                        {recent_mentoring 
                        ? <MyMentoringCard mentoringUrl={recent_mentoring} /> 
                        : <></>
                        }
                    </div>
                </div>
            </div>

            <div className="section" id="asMentee">
                <h2>멘티로서 진행중인 멘토링 목록</h2>
                <div className="mentoring_cards">
                {
                    participated_mentoring.map((element, index) => {
                        let t = element.split('/');
                        let mid = t[4];
                        return (
                            <Link to={`${match.url}/${mid}`} key={index}>
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
                            <Link to={`${match.url}/${mid}`}>
                                <MyMentoringCard mentoringUrl={element} key={index} />
                            </Link>
                            )
                    })
                }
                </div>
            </div>

            {/* <div className="section" id="waiting">
                <h2>신청 승낙 대기중인 멘토링 목록</h2>
            </div> */}
        </div>
    )


}

export default MymentoringList;