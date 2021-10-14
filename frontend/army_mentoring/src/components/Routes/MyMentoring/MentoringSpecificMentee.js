import React,{ useEffect, useState, useContext } from 'react';
import { _loadMentoring } from '../../../backend/profile';
import { UserContext } from '../../../context/Context';
import './MentoringSpecificMentee.scss';

function MentoringSpecificMentee({match, history}){

    const mid = match.params.id;
    const [user, setUser] = useContext(UserContext);
    const [mentoring, setMentoring] = useState({
        title: ''
    });


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
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            <div className="section" id="">
                <h2>this is mentoring specific for mentee</h2>
            </div>

            <div className="section" id="">
                <h2>{'제목 : ' + mentoring.title}</h2>
            </div>

            <div className="section" id="">
                <h2>오늘의 과제</h2>
            </div>

            <div className="section" id="">
                <h2>멘토링 진행률</h2>
            </div>

            <div className="section" id="plan">
                <h2>etc...</h2>
            </div>
        </div>
    )

}

export default MentoringSpecificMentee;