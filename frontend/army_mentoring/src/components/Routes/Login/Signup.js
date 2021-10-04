import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import './Signup.scss';
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

    return(
        <div id="t">
            <div className="test" id="signup.js">
                <div className="testTitle">signup</div>
                <form>
                    <div className="row">이름 : <input className="button" type="text" id="name"></input></div>
                    <div className="row">email : <input className="button" type="text" id="email"></input></div>
                    <input className="cb" type="button" value="중복확인" /*onClick={checkEmail}*/></input>
                    <div className="row">password : <input className="button" type="text" id="password"></input></div>
                    <div className="row">nickname : <input className="button" type="text" id="nickname"></input></div>
                    <img src={imgUrl}></img>
                    <div className="row">profile image : <input type="file" accept="image/*" id="profileimage" onChange={thumbnail}></input></div>
                    <div className="row">description : <input type="textarea" id="desc"></input><br /></div>
                    <input type="button" value="가입" onClick={register}></input>
                </form>
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