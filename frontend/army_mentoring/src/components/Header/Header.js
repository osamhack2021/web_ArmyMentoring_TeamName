import './Header.scss';
import {Link} from "react-router-dom";
import React, { useContext } from 'react';
import logo from './3.png';
import { UserContext } from '../../context/Context';

function Header({match, history}){
    const [user, setUser] = useContext(UserContext);

    /*API 코드 필요 */
    const logout = ()=>{
        history.push("/");
        sessionStorage.clear();
        setUser({});
    }
    
    const getUserId = ()=>{
        console.log(user);
        if(Object.keys(user).length == 0)
            return -1;
        const url = user.url;
        const t = url.split('/');
        console.log(t);
        return t[4];
    }

    return(
        <div className="header_div">
            <img className="logo_image" alt="logo" src={logo}/>
            <ul className="menu_list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/mentoring">Mentoring</Link></li>
                <li><Link to="/mymentoring">My mentoring</Link></li>
                <li><Link to="/community">Community</Link></li>
                { Object.keys(user).length != 0 ? 
                    <li><Link to={`/profile/${getUserId()}`}>profile</Link>/<a href="" onClick={logout}>logout</a></li> :
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