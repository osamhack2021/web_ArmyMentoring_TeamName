import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import './MentoringList.scss';
import { Input } from 'reactstrap';
import { _loadMentoringList } from '../../../backend/mentoring';

function MentoringList({match}){

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    const getId = (url)=>{
        const t = url.split('/');
        return t[4];
    }
    const load = ()=>{
        _loadMentoringList()
        .then(res=>{
            console.log(res);
            setMentoringList(res.data);
            setSearchResult(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    }

    useEffect(()=>{
        load();
    }, []);

    const [mentoringList, setMentoringList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const searchMentoring = (text)=>{
        console.log(text);
        setSearchText(text);
        const result = mentoringList.filter((m)=>{
            return m.title.toLowerCase().includes(text.toLowerCase())
        })
        console.log(result);
        setSearchResult(result);
    }

    return (
        <div className="MentoringList">           
            <div className="mentoring-list-container" id="sgstmentoring">
                <div className='mentoring-list-header'>
                    <div className='mentoring-list-title'>멘토링 목록</div>
                    <div className='mentoring-list-search-bar'>
                        <Input 
                        type='text' 
                        onChange={(e)=>{searchMentoring(e.target.value)}} 
                        placeholder="검색어를 입력하세요"
                        />
                    </div>
                </div>
                <hr />
                <div className='mentoring-list-box'>
                    {searchResult.map((m)=>{
                            return (
                            <Link to={`${match.url}/mentoring/${getId(m.url)}`}>
                                <img src={m.thumbnail} alt="thumbnail" />
                                <h4>{m.title}</h4>
                            </Link>
                            )
                    })}
                </div>
          </div>


            <Link to={`${match.url}/make`} id="button"><button>멘토링 만들기</button></Link>
        </div>
    )

}

export default MentoringList;