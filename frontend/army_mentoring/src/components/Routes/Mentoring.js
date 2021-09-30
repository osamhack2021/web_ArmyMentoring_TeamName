import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import './Mentoring.scss';
import Subnavbar from './Subnavbar';


function Mentoring(){

    useEffect(()=>{
        console.log('mounting..');
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        });
        return console.log('unmounting..');
    }, []);
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

    let [searchResult, setSearchResult] = useState([]);

    const handleChange = (e)=>{

        e.preventDefault();

        let v = e.target.value;
        let abc = searchResult.slice();
        abc.push(v);
        setSearchResult(abc);
    }

    const filtering = (e)=>{
        console.log('filtering');
    }

    return (
        <div>           
            <Subnavbar menu={menu}></Subnavbar>

            <div className="section" id="sgstmentoring">
                <div>
                    <h2>추천 멘토링</h2>
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
                <div>
                    <h2>추천 멘토</h2>
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

            <div className="section" id="srchmentoring">
                <div>
                    <h2>멘토링 검색</h2>
                    <ul>
                        <li onClick={filtering}>IT</li>
                        <li onClick={filtering}>운동</li>
                    </ul>
                    <div>
                        <form>
                            <input type="text" placeholder="멘토링 검색" onChange={handleChange}></input>
                            <input type="text" style={{display:'none'}}></input> {/*input이 1개일 경우 자동으로 submit이 되는 것을 방지*/}
                        </form>
                    </div>
                    <p>
                        {"검색결과"}<br />{searchResult.join(' ')}
                    </p>
                </div>
            </div>

            <Link to="/makementoring" id="button">make mentoring</Link>
        </div>
    )

}

export default Mentoring;