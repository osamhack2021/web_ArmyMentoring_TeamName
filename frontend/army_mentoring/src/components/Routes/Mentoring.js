import React from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';

function Mentoring(){

    return (
        <div>
            <h2>this is mentoring</h2>
            
            <div className="section">
                <h2>추천 멘토링</h2>
            </div>

            <div className="section">
                <h2>추천 멘토</h2>
            </div>

            <div className="section">
                <h2>멘토링 검색</h2>
            </div>
        </div>
    )


}

export default Mentoring;