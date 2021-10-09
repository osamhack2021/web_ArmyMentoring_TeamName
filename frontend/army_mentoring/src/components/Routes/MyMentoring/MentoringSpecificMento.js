import React, { useEffect } from 'react';
import './MentoringSpecificMento.scss';

function MentoringSpecificMento(){


    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    return (
        <div>
            <div className="section" id="">
                <h2>this is mentoring specific for mento</h2>
            </div>

            <div className="section" id="">
                <h2>멘토링 제목</h2>
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