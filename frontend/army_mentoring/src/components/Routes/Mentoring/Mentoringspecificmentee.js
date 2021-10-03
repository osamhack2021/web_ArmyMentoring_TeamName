import React,{ useEffect } from 'react';
import './Mentoringspecificmentee.scss';

function Mentoringspecificmentee(){


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
                <h2>this is mentoring specific for mentee</h2>
            </div>

            <div className="section" id="">
                <h2>멘토링 제목</h2>
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

export default Mentoringspecificmentee;