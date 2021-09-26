import React from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';

function Mentoring(){

    return (
        <div>            
            <div className="subnavbar">
                <ul>
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