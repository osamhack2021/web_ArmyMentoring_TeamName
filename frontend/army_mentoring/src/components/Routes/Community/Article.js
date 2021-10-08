import React, {useState, useEffect } from 'react';
import './Article.scss';
import { Link } from 'react-router-dom';

function Article({match}) {

  const [content,setContent] = useState({}); 
  const id = match.params.id;
  
  //원래는 API로 불러옴
  useEffect(() => {
      setContent(
            {
                id:id, title:'What is Lorem Ipsum?',
                contents:`Lorem Ipsum is simply dummy text of the printing 
                and typesetting industry. Lorem Ipsum has been the industry'
                s standard dummy text ever since the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make a typ
                e specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essenti
                ally unchanged. It was popularised in the 1960s with the rel
                ease of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus P
                ageMaker including versions of Lorem Ipsum.`,
                comments:1,likes:1 
            }
        )}, []);

    const clickLikes = ()=>{
        //로그인 되어있는지 체크, 이미 클릭했는지 체크
        let c = Object.assign({}, content);
        c.likes++;
        setContent(c);
        //서버에 데이터 업데이트
    }

    return (
        <div>
            <div className='community_board'>
                <div key={content.id} className='community_post'>
                    <div>{"id : " + content.id}</div>
                    <div className='community_title'>{content.title}</div>
                    <div className='community_contents'>{content.contents}</div>
                    <div className='community_statistics'>
                        <div className='community_comments'>댓글 {content.comments}</div>
                        <div className='community_likes' onClick={clickLikes}>좋아요 {content.likes}</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default Article;