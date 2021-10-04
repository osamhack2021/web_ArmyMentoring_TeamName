import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './Login.scss';
import {axios} from 'axios';

function Login(){

    const h = useHistory();

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    //임시 onLoggin
    const onLoggin = (e)=>{
        e.preventDefault();
        const email = document.getElementById('email');
        console.log(email.value);
        const response = {  //서버에서 받은 json 데이터
            "user": {
                "username": "testuser",
                "email": email.value
            },
            "token": "efd26a04e0222a160a5e819bfd4e6ca328c2bdc9"
        };
        console.log("login : " + JSON.stringify(response));
        sessionStorage.setItem('userinfo', JSON.stringify(response));   //session에 서버에서 받은 데이터를 객체로 반환해 저장
        document.location.href="/";   //홈페이지로 이동
    }

    return(
        <div>
            <div className="login_body" id="login.js">
                <div className="title">로그인</div>
                <Form className="form">
                    <FormGroup class="form-group">
                        <Label class="label">이메일</Label>
                        <Input type="email" id="email" name="email"></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">비밀번호</Label>
                        <Input type="password" id="password" name="password"></Input>
                    </FormGroup>
                    <Button id="login_button" onClick={onLoggin}>로그인</Button>
                    <Link to='/signup'>회원가입</Link>
                </Form>
            </div>
        </div>
    )  
}

export default Login;


/*  API 코드
    const onLoggin = ()=>{
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        axios({                                 //입력된 email, password를 서버로 보냄
            method : 'POST',
            url : 'https://???/auth/login',
            data : {
                "email" : email.value,
                "password" : password.value
            }
        }).then(function(res)=>{
            const response = res.data;                //서버에서 받은 json 데이터
            sessionStorage.setItem('token', response.token);   //session에 서버에서 받은 데이터 중 token을 객체로 반환해 저장
            document.location.href = "/";   //홈페이지로 이동
        })
    }
*/
