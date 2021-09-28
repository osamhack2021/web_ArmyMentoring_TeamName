import React from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';
import Subnavbar from './Subnavbar';

function Mentoring(){
    const menu = 
    [
        {id:'sgstmentoring', desc:'추천 멘토링'},
        {id:'sgstmentor', desc:'추천 멘토'},
        {id:'srchmentoring', desc:'멘토링 검색'}
    ]

    return (
        <div>           
            <Subnavbar menu={menu}></Subnavbar>

            <div className="section" id="sgstmentoring">
                <h2>추천 멘토링</h2>
                <p>
                    <Link to="/makementoring">make mentoring</Link><br />
                    <Link to="/mentorintro">mentoring introduction</Link>
                </p>
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