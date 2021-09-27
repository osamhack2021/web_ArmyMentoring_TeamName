import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';
import Subnavbar from './Subnavbar';

function Mentoring(){
    const t = 
    {
        id : ['sgstmentoring', 'sgstmentor', 'srchmentoring'],
        menu : [ '추천 멘토링', '추천 멘토', '멘토링 검색' ]
    }
    return (
        <div>           
            <Subnavbar t={t}></Subnavbar>

            <div className="section" id="sgstmentoring">
                <h2>추천 멘토링</h2>
            </div>

            <div className="section" id="sgstmentor">
                <h2>추천 멘토</h2>
            </div>

            <div className="section" id="srchmentoring">
                <h2>멘토링 검색</h2>
            </div>
        </div>
    )


}

export default Mentoring;