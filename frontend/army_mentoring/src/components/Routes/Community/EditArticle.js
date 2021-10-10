import React, {useState, useEffect } from 'react';
import './EditArticle.scss';
import { Input, Form, FormGroup } from 'reactstrap';
import { addArticle } from '../../../backend/community';

function EditArticle({match, history}) {

    sessionStorage.setItem('Token', 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6');
    const token = sessionStorage.getItem('Token');
    const user_id = 2;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const add = ()=>{
        addArticle(title, content, token, user_id)
        .then((res)=>{
            history.goBack();
        }).catch((err)=>{
            console.log(err.response);
        });
    }

    return (
        <div className='edit-article-body'>
            <Form className='input-area'>
                <Input type='text' id='title' onChange={(e)=>{setTitle(e.target.value)}} className='community_title' placeholder='제목 입력..'></Input>
                <Input type='textarea' id='content' onChange={(e)=>{setContent(e.target.value)}} className='community_contents' placeholder='내용 입력..'></Input>
            </Form>
            <div className='buttons'>
                <div className='cancel button' onClick={()=>{history.goBack()}}>취소</div>
                <div className='confirm button' onClick={()=>{add()}}>등록</div>
            </div>
        </div>
    );
  }

  export default EditArticle;