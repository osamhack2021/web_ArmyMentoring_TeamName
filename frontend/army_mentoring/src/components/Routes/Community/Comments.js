import React, {useState, useEffect } from 'react';
import './Comments.scss';

function Comments() {

    const [comment,setComment] = useState([]); 
    
    
    const addComment=()=>{
        const newComment = document.querySelector('.new_comment').value;
        setComment(comment=>[...comment, {
            id:comment.length+1,
            writer: '글쓴이',
            contents: newComment,
            date:'작성 시간'}])
    }
    
    useEffect(() => {
        setComment([
            {id:'1', writer:'이지호',contents:'댓글1',date:'01:17'},
            {id:'2', writer:'이현희',contents:'댓글2',date:'01:19'}
        ])
      }, []);
      return (
      <div>
          <div>작성자: 현재 사용유저</div>
          <div className='writing_area'>
                <textarea className='new_comment'></textarea>
                <button className='submit_comment' onClick={addComment} >댓글 작성</button>         
          </div>
          <div className="comments_board">
                {comment.map((comment)=>(
                    <div>
                        {comment.writer}
                        {comment.contents}
                        {comment.date}
                    </div>
                ))}

          </div>
      </div>
      );
    }
  
    export default Comments;