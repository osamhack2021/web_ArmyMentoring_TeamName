import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
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
    const onLoggin = ()=>{
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
        <div id="t">
            <div className="test" id="login.js">
                <div className="testTitle">login</div>
                <form>
                    <div className="row">
                    email : <input className="text" type="text" id="email"></input>
                    </div>
                    <div className="row">
                    password : <input className="text" type="text" id="password"></input>
                    </div>
                    <div className="row">
                    <input type="button" className="button" value="login" onClick={onLoggin}></input>
                    <Link className="ar" to="/signup">sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )  

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
            sessionStorage.setItem('userinfo', JSON.parse(response));   //session에 서버에서 받은 데이터를 객체로 반환해 저장
            document.location.href = "/";   //홈페이지로 이동
        })
        
    }
*/
}

export default Login;