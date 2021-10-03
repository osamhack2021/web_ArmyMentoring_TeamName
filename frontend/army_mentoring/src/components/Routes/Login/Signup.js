import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import './Signup.scss';
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

    //임시 register
    const register = ()=>{
        const email = document.getElementById('rEmail');
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

    return(
        <div id="t">
            <div className="test" id="signup.js">
                <div className="testTitle">signup</div>
                <form>
                    <div className="row">이름 : <input className="button" type="text" id="rName"></input></div>
                    <div className="row">email : <input className="button" type="text" id="rEmail"></input></div>
                    <input className="cb" type="button" value="중복확인" /*onClick={checkEmail}*/></input>
                    <div className="row">password : <input className="button" type="text" id="rPassword"></input></div>
                    <div className="row">nickname : <input className="button" type="text" id="rNickname"></input></div>
                    <div className="row">profile image : <br /></div>
                    <div className="row">description : <input type="textarea" id="rDesc"></input><br /></div>
                    <input type="button" value="가입" onClick={register}></input>
                </form>
            </div>
        </div>
    )  
}

export default Login;