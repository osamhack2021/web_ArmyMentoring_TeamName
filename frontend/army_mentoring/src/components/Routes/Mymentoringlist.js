import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mymentoringlist.scss';
import Subnavbar from './Subnavbar';

function Mymentoringlist(){
    const t =
    {
        id:['asmentee', 'asmentor', 'waiting'],
        menu:[
            '멘티로서 진행중인 멘토링 목록',
            '멘토로서 진행중인 멘토링 목록',
            '신청 승낙 대기중인 멘토링 목록'  
        ]
    }

    return (
        <div>      
            <Subnavbar t={t}></Subnavbar>

            <div className="section">
                <h2>최근 수강 강좌</h2>
            </div>

            <div className="section" id="asmentee">
                <h2>멘티로서 진행중인 멘토링 목록</h2>
            </div>

            <div className="section" id="asmentor">
                <h2>멘토로서 진행중인 멘토링 목록</h2>
            </div>

            <div className="section" id="waiting">
                <h2>신청 승낙 대기중인 멘토링 목록</h2>
            </div>
        </div>
    )


}

export default Mymentoringlist;