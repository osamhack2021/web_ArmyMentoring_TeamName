import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import './Signup.scss';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {axios} from 'axios';

function Login(){
    const h = useHistory();
    const [imgUrl, setImgUrl] = useState("");

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    //임시 register
    const register = ()=>{
        const email = document.getElementById('email');
        const response = {   //서버에서 받은 json 데이터
            "user": {
                "username": "testuser",
                "email": email.value
            },
            "token": "efd26a04e0222a160a5e819bfd4e6ca328c2bdc9"
        };              
        console.log("login : " + JSON.stringify(response));
        sessionStorage.setItem('userinfo', JSON.stringify(response));  //session에 서버에서 받은 데이터를 객체로 반환해 저장
        document.location.href="/";   //홈페이지로 이동
        
    }

    const thumbnail= (e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=>{
            console.log(reader.result);
            setImgUrl(reader.result);
        }
    }

    const emailValid = (e)=>{
        const el = e.target;
        const rule = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
        console.log(el.value);
        if(rule.test(el.value)){
            el.className = "is-valid form-control";
        }else{
            el.className = "is-invalid form-control";
        }
    }

    return(
        <div>
            <div className="signup_body">
                <div className="title">회원가입</div>
                <Form className="form">
                    <FormGroup class="form-group">
                        <Label class="label">이메일</Label>
                        <Input type="email" id="email" name="email" onChange={emailValid}></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">비밀번호</Label>
                        <Input type="password" id="password" name="password"></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">이름</Label>
                        <Input type="text" id="username" name="username"></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">별명</Label>
                        <Input type="text" id="nickname" name="nickname"></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">자기소개</Label>
                        <Input type="text" id="description" name="description"></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">프로필 사진</Label>
                        <img src={imgUrl}></img>
                        <Input type="file" accept="image/*" id="profileimage" name="profileimage" onChange={thumbnail}></Input>
                    </FormGroup>
                    <Button id="login_button" onClick={register}>회원가입</Button>
                </Form>
            </div>
        </div>
    )  
}

export default Login;

/*
    const register = ()=>{
        const username = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const nickname = document.getElementById('nickname');
        const profileimage = document.getElementById('profileimage');
        const formData = new FormData();
        formData.append('profileimage', profileimage.files[0]);
        const desc = document.getElementById('desc');
        axios({                                 //입력된 가입정보를 서버로 보냄
            method : 'POST',
            url : 'https://???/auth/register',
            data : {
                "username" : username.value,
                "email" : email.value,
                "password" : password.value,
                "nickname" : nickname.value,
                "profileimage" : formData,
                "desc" : desc.value
            }
        }).then(function(res)=>{
            const response = res.data;                //서버에서 받은 json 데이터
            sessionStorage.setItem('token', response.token);   //session에 서버에서 받은 데이터를 객체로 반환해 저장
            document.location.href = "/";   //홈페이지로 이동
        })
        
    }
*/