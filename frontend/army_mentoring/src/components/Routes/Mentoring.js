import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';

function Mentoring(){

    const setNavPos = (e)=>{
        const u = document.getElementById('test');
        if(window.pageYOffset > 80)
            u.className = 'fixedNav';
        else
            u.className = 'staticNav';
    }
    useEffect(()=>{
        window.addEventListener('scroll', setNavPos);
        return ()=>{
            window.removeEventListener('scroll', setNavPos);
        }
    });

    return (
        <div>            
            <div className="subnavbar">
                <ul id="test">
                    <li><a href="#sgstmentoring">추천 멘토링</a></li>
                    <li><a href="#sgstmentor">추천 멘토</a></li>
                    <li><a href="#srchmentoring">멘토링 검색</a></li>
                </ul>
            </div>

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