import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';

function Mentoring(){

    /* sub nav bar 화면 따라가기 */
    const setNavStyle = (e)=>{
        const u = document.getElementById('test');
        if(window.pageYOffset > 80)
            u.className = 'fixedNav';
        else
            u.className = 'staticNav';
    }

    useEffect(()=>{
        window.addEventListener('scroll', setNavStyle);
        return ()=>{
            window.removeEventListener('scroll', setNavStyle);
        }
    });

    /* sub nav bar 하이라이팅 */
    const highlighting = (e)=>{
        const clicked = e.target.parentNode;
        clicked.className = "clicked";
        
        var sib = clicked.nextSibling;
        while(sib){
            sib.className = "";
            sib = sib.nextSibling;
        }
        var sib = clicked.previousSibling;
        while(sib){
            sib.className = "";
            sib = sib.previousSibling;
        }
    }

    return (
        <div>            
            <div className="subnavbar">
                <ul id="test">
                    <li onClick={highlighting}><a href="#sgstmentoring">추천 멘토링</a></li>
                    <li onClick={highlighting}><a href="#sgstmentor">추천 멘토</a></li>
                    <li onClick={highlighting}><a href="#srchmentoring">멘토링 검색</a></li>
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