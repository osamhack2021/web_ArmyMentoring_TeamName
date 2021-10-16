import React, {useState, useEffect, useContext } from 'react';
import './EditArticle.scss';
import { Input, Form } from 'reactstrap';
import { _addArticle, _loadArticle, _updateArticle } from '../../../backend/community';
import { UserContext }  from '../../../context/Context';

function EditArticle({match, history}) {

    const article_id = match.params.id;
    let isAddPage = false;
    if(article_id == undefined){
        isAddPage = true;
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [liked_user, setLiked_user] = useState([]);

    useEffect(()=>{
        if(!isAddPage){
            const t = document.getElementById('title');
            const c = document.getElementById('content');
            _loadArticle(article_id)
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

    const getUserId = ()=>{
        if(Object.keys(user).length == 0)
            return -1;
        const url = user.url;
        const t = url.split('/');
        return t[4];
    }

    const addOrEditArticle = ()=>{
        if(isAddPage){
            const user_id = getUserId();
            _addArticle(title, content, user_id)
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
            _updateArticle(c, article_id)
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