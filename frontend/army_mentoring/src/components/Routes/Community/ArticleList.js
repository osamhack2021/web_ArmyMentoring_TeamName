import React, {useState, useEffect } from 'react';
import './ArticleList.scss';
import { Link } from 'react-router-dom';
import { loadArticleList } from '../../../backend/community';
import heartImg from '../img/heart.png'; 
import dialogImg from '../img/dialog.png';

function ArticleList({match}) {

  sessionStorage.setItem('Token', 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6');
  const token = sessionStorage.getItem('Token');
  const user_id = 2;

  const [list,setList] = useState([]);


  const load = ()=>{
      loadArticleList()
      .then(res=>{
          setList(res.data);
      }).catch(err=>{
          console.log(err.response);
      });
  }
  useEffect(()=>{ load(); }, []);

    return (
        <div>
            <div className='community_board'>
            <div className='add-button'>
                <Link to={`${match.url}/add`} className='add button'>+</Link>
            </div>
            {list.map((li) => {
                let u = li.url.split('/');
                let id = u[4];
                return (
                    <Link to={`${match.url}/${id}`}>
                        <div key={id} className='community_post'>
                            {"id : " + id}
                            <div className='community_title'>{li.title}</div>
                            <div className='community_contents'>{li.content}</div>
                            <div className='community_statistics'>
                                <div className='community_comments'><img src={dialogImg}></img>{li.question_comments.length}</div>
                                <div className='community_likes'><img src={heartImg}></img>{li.liked_user.length}</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
            </div>
        </div>
    );
  }

  export default ArticleList;