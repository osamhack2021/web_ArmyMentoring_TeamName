import React, {useState, useEffect } from 'react';
import './ArticleList.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticleList({match}) {

  const [list,setList] = useState([]);
  //실제로는 sessionStorage에서 가져올 듯?
  const token = '905e125ab3ee40e3a74f6915c9dd3f540b987dc6';

  const load = ()=>{
        axios({
            method : 'GET',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question'
        }).then((res)=>{
            console.log(res);
            setList(res.data);
        }).catch((err)=>{
            console.log(err);
        });
  }
  useEffect(()=>{ load() }, [])


  const removeButton = ()=>{
    axios({
        method : 'DELETE',
        url : 'https://guntor-guntee-data-server.herokuapp.com/question/1',
        headers : { Authorization : 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6'}
    }).then((res)=>{
        console.log(res);
        load();
    }).catch((err)=>{
        console.log(err.response);
    });
  }

    return (
        <div>
            <div className='community_board'>
            <Link to={`${match.url}/add`}>add</Link>
            {list.map((li) => (
                <Link to={`${match.url}/${li.id}`}>
                    <div key={li.id} className='community_post'>
                        <div className='community_title'>{li.title}</div>
                        <div className='community_contents'>{li.content}</div>
                        <div className='community_statistics'>
                            <div className='community_comments'>댓글 {li.question_comments.length}</div>
                            <div className='community_likes'>좋아요 {li.liked_user.length}</div>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
  }

  export default ArticleList;