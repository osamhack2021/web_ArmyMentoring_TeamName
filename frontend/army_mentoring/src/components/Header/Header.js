import './Header.scss';
import {Link} from "react-router-dom";
import React, {useEffect} from 'react';
import logo from './3.png';
import { Router, useHistory } from 'react-router-dom';
import axios from "axios";

function Header(){
    let mypage = sessionStorage.getItem('userinfo');
    const h = useHistory();

    /*API 코드 필요 */
    const logout = ()=>{
        h.push("/");
        sessionStorage.clear();
    }

    let id = 1; //현재 로그인한 유저의 id

    return(
        <div className="header_div">
            <img className="logo_image" alt="logo" src={logo}/>
            <ul className="menu_list">
                <li><Link to="/">home</Link></li>
                <li><Link to="/mentoring">mentoring</Link></li>
                <li><Link to="/mymentoringlist">mymentoringlist</Link></li>
                <li><Link to="/community">commuity</Link></li>
                { mypage ? 
                    <li><Link to={`/profile/${id}`}>profile</Link>/<a href="" onClick={logout}>logout</a></li> :
                    <li><Link to="/login">login</Link></li>
                }  
            </ul>
        </div>
    );
    
}

export default Header;

/*
    const onLoggin = ()=>{
        const token = sessionStorage.getItem('token');
        axios({
            method : 'GET',
            url : 'https://???/auth/logout',
            headers : { 'token' : token }
        }).then(function(res)=>{
            const response = res.data;       //서버에서 받은 json 데이터
            //에러 발생시?
            document.location.href = "/";   //홈페이지로 이동
        })
    }
*/