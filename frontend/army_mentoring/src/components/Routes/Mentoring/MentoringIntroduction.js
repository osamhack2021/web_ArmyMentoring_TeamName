import React, { useState, useEffect } from 'react';
import './MentoringIntroduction.scss';
import Subnavbar from '../Subnavbar';

function MentoringIntroduction(){
    const menu = 
    [
        {id:'home', desc:'홈'},
        {id:'mentorintro', desc:'멘토 소개'},
        {id:'assignmentintro', desc:'과제 소개'},
        {id:'plan', desc:'세부 일정'},
        {id:'review', desc:'후기'}
    ]


    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );


    let [mentoringInfo, setMentoringInfo] = useState([
    ]);


    
    // const mentoringInfo = ()=>{
    //     const token = sessionStorage.getItem('token');
    //     axios({                                 //멘토링정보 요청
    //         method : 'GET',
    //         url : 'https://http://127.0.0.1:8000//mentoring/:pk',
    //         headers : { "token" : token.token }
    //     }).then(function(res)=>{    
    //         const id = res.id;
    //         axios({method : 'GET', url : 'https://http://127.0.0.1:8000//mentoring/:pk', headers : { "token" : token.token }})
    //         .then(function(res)=>{            
    //             const response = res.data,
    //             const mentoringinfo = {
    //             response.title,
    //             response.mentor,
    //             response.portfolio,
    //             response.mentees,
    //             response.tags
    //             }
    //             setMentoringInfo(mentoringInfo);  //받은 멘토링정보를 state에 저장
    //           });
    //  }

    return (
        <div className='mentoring_section'>           
            
            <div className='mentoring_introduction'>
            <div className="section" id="mentoring_portfolio">
                <h2>이름/ 포트폴리오</h2>
            </div>

            <div className="section" id="mentorintro">
                <h2>멘토링 소개</h2>
            </div>

            <div className="section" id="assignmentintro">
                <h2>과제 소개</h2>
            </div>

            <div className="section" id="plan">
                <h2>세부 일정</h2>
            </div>

            <div className="section" id="review">
                <h2>후기</h2>
            </div>
            </div>
        </div>
    )

}

export default MentoringIntroduction;