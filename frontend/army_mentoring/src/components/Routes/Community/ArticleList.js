import React, {useState, useEffect } from 'react';
import './ArticleList.scss';
import { Link } from 'react-router-dom';

function ArticleList({match}) {

  const [menu,setMenu] = useState([]); 
  
  useEffect(() => {
      setMenu([
        {
            id:0, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        },
        {
            id:1, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        },
        {
            id:2, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        },
        {
            id:3, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        }
    ]);
    }, []);
    return (
    <div>
        <div className='community_board'>
        {menu.map((menu) => (
            <Link to={`${match.url}/${menu.id}`}>
                <div key={menu.id} className='community_post'>
                    <div>{"id : " + menu.id}</div>
                    <div className='community_title'>{menu.title}</div>
                    <div className='community_contents'>{menu.contents}</div>
                    <div className='community_statistics'>
                        <div className='community_comments'>댓글 {menu.comments}</div>
                        <div className='community_likes'>좋아요 {menu.likes}</div>
                    </div>
                </div>
            </Link>
        ))}
        </div>
    </div>
    );
  }

  export default ArticleList;