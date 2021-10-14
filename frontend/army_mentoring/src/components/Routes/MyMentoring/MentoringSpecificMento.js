import React, { useContext, useEffect, useState } from 'react';
import { _loadMentoring } from '../../../backend/profile';
import { UserContext } from '../../../context/Context';
import './MentoringSpecificMento.scss';

function MentoringSpecificMento({match, history}){

    const mid = match.params.id;
    const [user, setUser] = useContext(UserContext);
    const [mentoring, setMentoring] = useState({
        title : ''
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
                <h2>this is mentoring specific for mento</h2>
            </div>

            <div className="section" id="">
                <h2>{'제목 : ' + mentoring.title}</h2>
            </div>

            <div className="section" id="">
                <h2>과제 관리</h2>
            </div>

            <div className="section" id="">
                <h2>멘티 목록 관리</h2>
            </div>
        </div>
    )

}

export default MentoringSpecificMento;