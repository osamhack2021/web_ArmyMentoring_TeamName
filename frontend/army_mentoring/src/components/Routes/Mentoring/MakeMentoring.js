import React, { useState,useEffect } from 'react';
import './MakeMentoring.scss';
import soldier from '../img/soldier.png';
function MakeMentoring(){


    const [newmentoring,setNewmentoring] = useState([]); 

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );


    
    return (
        <div>
            <div className='makementoring_profile' >
                <img src={soldier}/>
                <div className='makementoring_about'></div>
            </div>

            <div className="section">
                <h2>멘토링 소개 작성</h2>
                <textarea></textarea>
            

            
                <h2>과제 작성</h2>
                <textarea></textarea>
            

            
                <h2>세부 일정 작성</h2>
                <textarea></textarea>
            

            
                <div>
                    <button>확인</button>
                    <button>취소</button>
                </div>
            </div>
            
        </div>
    )

}

export default MakeMentoring;