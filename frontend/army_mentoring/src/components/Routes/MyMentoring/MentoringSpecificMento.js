import React, { useContext, useEffect, useState } from 'react';
import { _loadMentoring, _loadUser } from '../../../backend/profile';
import { UserContext } from '../../../context/Context';
import './MentoringSpecificMento.scss';

function MentoringSpecificMento({match, history}){

    const mid = match.params.id;
    const [user, setUser] = useContext(UserContext);
    const [mentoring, setMentoring] = useState({
        title : ''
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

    const load = ()=>{
        _loadMentoring(mid)
        .then(res=>{
            setMentoring(res.data);
            let url = res.data.mentor;
            let t = url.split('/');
            let mentorid = t[4];
            _loadUser(mentorid)
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
            <div className="section" id="">
                <h2>this is mentoring specific for mentee</h2>
            </div>

            <div className="title-container" id="">
                <div>
                    <img alt="mentor profile"></img>
                    <div>{mentor.username}</div>
                    <div>포트폴리오 : {mentoring.portfolio}</div>
                </div>
                <div>
                    <h2>{'제목 : ' + mentoring.title}</h2>
                    <div>목표</div>
                    <div>기간 : {mentoring.start_date}~{mentoring.end_date}</div>
                </div>
                <div className='tags'>
                    tags
                    {
                        ( Boolean(mentoring.tags) &&
                            mentoring.tags.map((t)=>{
                                console.log(t);
                                return (<div>{'#'+t.name}</div>)
                            })
                        )
                    }
                </div>
            </div>
            <div className='content-container'>

                <div className="assignments" id="">
                    <h2>오늘의 과제</h2>
                    <ul>
                        {
                            (
                                Boolean(mentoring.assignments) &&
                                mentoring.assignments.map((a)=>{
                                    return (<div>{a}</div>)
                                })
                            )
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