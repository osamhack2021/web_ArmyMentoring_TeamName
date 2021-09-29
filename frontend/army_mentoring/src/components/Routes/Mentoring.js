import React  from 'react';
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

    const sgstmentoringData = 
    [
        {id:0, title:'title0', desc:'desc0'},
        {id:1, title:'title1', desc:'desc1'},
        {id:2, title:'title2', desc:'desc2'},
        {id:3, title:'title3', desc:'desc3'},
        {id:4, title:'title4', desc:'desc4'},
        {id:5, title:'title5', desc:'desc5'},
        {id:6, title:'title6', desc:'desc6'},
        {id:7, title:'title7', desc:'desc7'},
        {id:8, title:'title8', desc:'desc8'},
        {id:9, title:'title9', desc:'desc9'}
    ]

    return (
        <div>           
            <Subnavbar menu={menu}></Subnavbar>

            <div className="section" id="sgstmentoring">
                <div>
                <h2>추천 멘토링</h2>
                <Link to="/makementoring">make mentoring</Link>
                <p>
                    {sgstmentoringData.map((m)=>{
                            return <Link to={{
                                pathname : '/mentoringintro',
                                state : {
                                    id: m.id
                                }}
                            }><h4>{m.title}</h4><p>{m.desc}</p></Link>
                    })}
                </p>
                </div>
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