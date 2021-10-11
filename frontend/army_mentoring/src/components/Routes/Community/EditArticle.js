import React, {useState, useEffect } from 'react';
import './EditArticle.scss';
import { Input, Form, FormGroup } from 'reactstrap';
import { _addArticle, _loadArticle, _updateArticle } from '../../../backend/community';

function EditArticle({match, history}) {

    const article_id = match.params.id;
    let isAddPage = false;
    if(article_id == undefined){
        isAddPage = true;
    }


    sessionStorage.setItem('Token', 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6');
    const token = sessionStorage.getItem('Token');
    const user_id = 2;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');
    const [liked_user, setLiked_user] = useState([]);

    useEffect(()=>{
        if(!isAddPage){
            const t = document.getElementById('title');
            const c = document.getElementById('content');
            _loadArticle(token, article_id)
            .then(res=>{
                t.value = res.data.title;
                c.value = res.data.content;
                setTitle(t.value);
                setContent(c.value); 
                setUser(res.data.user);
                setLiked_user(res.data.liked_user);
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
    }, [isAddPage]);

    const addOrEditArticle = ()=>{
        if(isAddPage){
            _addArticle(title, content, token, user_id)
            .then((res)=>{
                history.goBack();
            }).catch((err)=>{
                console.log(err.response);
            });
        }
        else{
            const c = {
                title : title,
                content : content,
                user : user,
                liked_user : liked_user
            }
            _updateArticle(c, token, article_id)
            .then(res=>{
                history.goBack();
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
    }

    return (
        <div className='edit-article-body'>
            <Form className='input-area'>
                <Input type='text' id='title' onChange={(e)=>{setTitle(e.target.value)}} className='community_title' placeholder='제목 입력..'></Input>
                <Input type='textarea' id='content' onChange={(e)=>{setContent(e.target.value)}} className='community_contents' placeholder='내용 입력..'></Input>
            </Form>
            <div className='buttons'>
                <div className='cancel button' onClick={()=>{history.goBack()}}>취소</div>
                <div className='confirm button' onClick={addOrEditArticle}>{isAddPage ? '등록': '수정'}</div>
            </div>
        </div>
    );
  }

  export default EditArticle;