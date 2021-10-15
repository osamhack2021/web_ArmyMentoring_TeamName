import React, { useContext, useEffect, useState } from 'react';
import { _loadMentoring, _loadUser } from '../../../backend/profile';
import { UserContext } from '../../../context/Context';
import './MentoringSpecificMento.scss';
import { Link } from 'react-router-dom';

function MentoringSpecificMento({match, history}){

    const mentoring_id = match.params.id;
    const [user, setUser] = useContext(UserContext);
    const [mentoring, setMentoring] = useState({
        title : '',
        tags : [],
        assignments : []
    });
    const [mentor, setMentor] = useState({});

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    useEffect(()=>{
        load();
    }, []);

    const getId = (url)=>{
        const t = url.split('/');
        return t[4];
    }

    const getMentorId = ()=>{
        if(Object.keys(mentor).length == 0)
            return -1;
        return getId(mentor.url);
    }
    
    const getPortfolioId = ()=>{
        let url = mentoring.portfolio;
        if(url == undefined)
            return -1;
        return getId(url);
    }

    const load = ()=>{
        _loadMentoring(mentoring_id)
        .then(res=>{
            setMentoring(res.data);
            let mentor_id = getId(res.data.mentor);
            _loadUser(mentor_id)
            .then(res=>{
                setMentor(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className='specific-mentor-body'>
            <div className="title-container" id="">
                <div>
                    <img alt="mentor profile"></img>
                    <Link to={`/profile/${getMentorId()}`}>멘토 : {mentor.username}</Link><br />
                    <Link to={`/profile/${getMentorId()}/portfolio/${getPortfolioId()}`}>포트폴리오 보러 가기</Link>
                </div>
                <div>
                    <h2>{'제목 : ' + mentoring.title}</h2>
                    <div className="during">기간 : {mentoring.start_date}~{mentoring.end_date}</div>
                </div>
                <div className='tags'>
                    <div className='tag-box'>
                    {
                        mentoring.tags.map((t)=>{
                            return (<div className='tag'>{'#'+t.name}</div>)
                        })
                    }
                    </div>
                </div>
            </div>
            <div className='content-container'>

                <div className="assignments" id="">
                    <h2>오늘의 과제</h2>
                    <ul>
                        {
                            mentoring.assignments.map((a)=>{
                                return (<div>{a}</div>)
                            })
                        }
                    </ul>
                </div>

                <div className="section" id="plan">
                    <h2>메모</h2>
                    {mentoring.memo}
                </div>
            </div>
        </div>
    )

}

export default MentoringSpecificMento;