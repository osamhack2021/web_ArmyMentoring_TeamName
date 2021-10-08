import React, {useState, useEffect } from 'react';
import './Article.scss';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';

function Article({match}) {

    //원래는 API로 불러옴
    const id = match.params.id;
    const [comments, setComments] = useState(
    [
        {
            writer:'example', 
            description:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry.`,
            date:'21/10/08'
        },
        {
            writer:'example1', 
            description:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry.`,
            date:'21/10/08'
        }
    ]);
    const [content,setContent] = useState(
    {
        id:id, 
        title:'What is Lorem Ipsum?',
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
        likes:1 
    }); 
  

    const clickLikes = ()=>{
        //로그인 되어있는지 체크, 이미 클릭했는지 체크
        let c = Object.assign({}, content);
        c.likes++;
        setContent(c);
        //서버에 데이터 업데이트
    }

    const addComment=()=>{
        const writer = 'example2';
        const description = document.getElementById('description').value;
        const date = new Date().toDateString();
        const c = {
            writer : writer,
            description : description,
            date : date
        }
        setComments([...comments, c]);
    }

    return (
        <div key={content.id} className='community_post'>
            <div>{"id : " + content.id}</div>
            <div className='community_title'>{content.title}</div>
            <div className='community_contents'>{content.contents}</div>
            <div className='community_statistics'>
                <div className='community_comments'>댓글 {comments.length}</div>
                <div className='community_likes' onClick={clickLikes}>좋아요 {content.likes}</div>
            </div>
            <div className='comments'>
                {comments.map((comment)=>{
                    return (
                        <div className='comment'>
                            <div className='head'>
                                <div className='writer'>작성자 : {comment.writer}</div>
                            </div>
                            <div className='description'>{comment.description}</div>
                            <div className='tail'>
                                <div className='date'>{comment.date}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Form className="input-comment">
                <Input className='description' id='description' type="text"></Input>
                <Button className='button' onClick={addComment}>댓글 입력</Button>
            </Form>
        </div>
    );
  }

  export default Article;