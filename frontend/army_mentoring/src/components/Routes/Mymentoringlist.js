import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mymentoringlist.scss';
import Subnavbar from './Subnavbar';

function Mymentoringlist(){  
    const menu = 
    [
        {id:'recent', desc:'최근 수강 강좌'},
        {id:'asmentee', desc:'멘티로서 진행중인 멘토링 목록'},
        {id:'asmentor', desc:'멘토로서 진행중인 멘토링 목록'},
        {id:'waiting', desc:'신청 승낙 대기중인 멘토링 목록'}
    ]

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}
    );

    return (
        <div>      
            <Subnavbar menu={menu}></Subnavbar>

            <div className="section" id="recent">
                <h2>최근 수강 강좌</h2>
            </div>

            <div className="section" id="asmentee">
                <h2>멘티로서 진행중인 멘토링 목록</h2>
                <Link to='/mentoringspecificmentee'>mentoringspecificmentee</Link>
            </div>

            <div className="section" id="asmentor">
                <h2>멘토로서 진행중인 멘토링 목록</h2>
                <Link to='/mentoringspecificmento'>mentoringspecificmento</Link>
            </div>

            <div className="section" id="waiting">
                <h2>신청 승낙 대기중인 멘토링 목록</h2>
            </div>
        </div>
    )


}

export default Mymentoringlist;