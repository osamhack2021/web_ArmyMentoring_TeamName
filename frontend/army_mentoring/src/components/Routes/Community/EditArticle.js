import React, {useState, useEffect } from 'react';
import './EditArticle.scss';
import { Input, Form, FormGroup } from 'reactstrap';
import axios from 'axios';

function EditArticle({match, history}) {

    const addArticle = ()=>{
        let id = -1;
        axios({
            method : 'GET',
            url : 'https://guntor-guntee-data-server.herokuapp.com/auth/user',
            headers : { Authorization : 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6'}
        }).then((res)=>{
            console.log('get user inform success');
            id = res.data.id;
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            console.log('title : '+title);
            console.log('content : ' +content);
            axios({
                method : 'POST',
                url : 'https://guntor-guntee-data-server.herokuapp.com/question',
                headers : { Authorization : 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6'},
                data : {
                    title : title,
                    content : content,
                    user : 'https://guntor-guntee-data-server.herokuapp.com/user/' + id,
                    liked_user : [ 'https://guntor-guntee-data-server.herokuapp.com/user/' + id ] 
                }
            }).then((res)=>{
                console.log(res);
                history.goBack();
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className='edit-article-body'>
            <Form className='input-area'>
                <Input type='text' id='title' className='community_title' placeholder='제목 입력..'></Input>
                <Input type='textarea' id='content' className='community_contents' placeholder='내용 입력..'></Input>
            </Form>
            <div className='buttons'>
                <div className='cancel button' onClick={()=>{history.goBack()}}>취소</div>
                <div className='confirm button' onClick={()=>{addArticle()}}>등록</div>
            </div>
        </div>
    );
  }

  export default EditArticle;