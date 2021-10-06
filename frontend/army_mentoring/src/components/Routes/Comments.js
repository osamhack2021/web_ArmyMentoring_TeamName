import React, {useState, useEffect } from 'react';
import './Comments.scss';

function Comments() {

    const [comment,setComment] = useState([]); 
    
    /*
    const addComment=()=>{
        const newComment = document.querySelector('.new-comment').value;
        setComment(comment=>[...comment, ])
    }
    */
    useEffect(() => {
        setComment([
            {id:'1', writer:'이지호',contents:'내용1',date:'01:17'},
            {id:'2', writer:'이현희',contents:'내용1',date:'01:19'}
        ])
      }, []);
      return (
      <div>
          <div>작성자: 현재 사용유저</div>
          <div className='writing_area'>
                <textarea className='new-comment'></textarea>
                <button className='submit_comment' >댓글 작성</button>         
          </div>
          <div className="comments_board">
                {comment.map((comment)=>(
                    <div>{comment.writer}</div>
                ))}

          </div>
      </div>
      );
    }
  
    export default Comments;