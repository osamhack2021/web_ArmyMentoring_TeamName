import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './Login.scss';
import axios from 'axios';

function Login(){


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

        const response = {  //서버에서 받은 json 데이터
            "user": {
                "username": "testuser",
                "email": email.value
            },
            "token": "efd26a04e0222a160a5e819bfd4e6ca328c2bdc9"
        };
        console.log("login : " + JSON.stringify(response));
        sessionStorage.setItem('userinfo', JSON.stringify(response));   //session에 서버에서 받은 데이터를 객체로 반환해 저장
        document.location.href = "/";   //홈페이지로 이동
    }
/*
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
        document.location.href = "/";   //홈페이지로 이동
        
    }
/*
    const register = ()=>{
        const username = document.getElementById('rName');
        const email = document.getElementById('rEmail');
        const password = document.getElementById('rPassword');
        const nickname = document.getElementById('rNickname');
        const profileimage = 'image';
        const desc = document.getElementById('rDesc');
        axios({                                 //입력된 가입정보를 서버로 보냄
            method : 'POST',
            url : 'https://???/auth/register',
            data : {
                "username" : username.value,
                "email" : email.value,
                "password" : password.value,
                "nickname" : nickname.value,
                "profileimage" : profileimage,
                "desc" : desc.value
            }
        }).then(function(res)=>{
            const response = res.data;                //서버에서 받은 json 데이터
            sessionStorage.setItem('userinfo', JSON.parse(response));   //session에 서버에서 받은 데이터를 객체로 반환해 저장
            document.location.href = "/";   //홈페이지로 이동
        })
        
    }
*/

    let [userinfo, setUserInfo] = useState("");
    //임시 showInfo
    const showInfo = ()=>{         
        let us = sessionStorage.getItem('userinfo');
        console.log("show Info : " + us);
        console.log("us type : " + typeof us);
        let pa = JSON.parse(us);
        console.log(pa);
        console.log(pa.user.email);
        const response = {
            "email": pa.user.email
        };
        setUserInfo(response);  //받은 유저정보를 state에 저장
    }
/*
    const showInfo = ()=>{
        const token = sessionStorage.getItem('userinfo');
        axios({                                 //유저정보 요청
            method : 'GET',
            url : 'https://???/auth/user/',
            headers : { "token" : token.token }
        }).then(function(res)=>{                
            const response = res.data;
            setUserInfo(JSON.parse(response));  //받은 유저정보를 state에 저장
        })
    }
*/

    return(
        <div id="t">
            <div className="test" id="login.js">
                <div className="testTitle">login</div>
                <form>
                    email : <input type="text" id="email"></input><br />
                    password : <input type="text" id="password"></input><br />
                    <input type="button" value="login" onClick={onLoggin}></input>
                </form>
            </div>
            <div className="test" id="signup.js">
                <div className="testTitle">signup</div>
                <form>
                    이름 : <input type="text" id="rName"></input><br />
                    email : <input type="text" id="rEmail"></input><input type="button" value="중복확인" /*onClick={checkEmail}*/></input><br />
                    password : <input type="text" id="rPassword"></input><br />
                    nickname : <input type="text" id="rNickname"></input><br />
                    profile image : <br />
                    description : <input type="textarea" id="rDesc"></input><br />
                    <input type="button" value="가입" onClick={register}></input>
                </form>
            </div>
            <div className="test" id="mypage.js">
                <div className="testTitle">mypage</div>
                <form>
                    <input type="button" value="정보보이기" onClick={showInfo}></input>
                </form>
                {Object.entries(userinfo)}
            </div>
        </div>
    )  
}

export default Login;