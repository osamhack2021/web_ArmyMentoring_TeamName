import React, { useEffect } from 'react';
import './Makementoring.scss';

function Makementoring(){

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}
    );

    return (
        <div>
            <div className="section" id="">
                <h2>this is make mentoring</h2>
            </div>

            <div className="section" id="">
                <h2>홈</h2>
            </div>

            <div className="section" id="">
                <h2>멘토 소개</h2>
            </div>

            <div className="section" id="">
                <h2>과제 소개</h2>
            </div>

            <div className="section" id="">
                <h2>세부 일정</h2>
            </div>

            <div className="section" id="">
                <h2>후기</h2>
            </div>
        </div>
    )

}

export default Makementoring;