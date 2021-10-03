import './Header.scss';
import {Link} from "react-router-dom";
import React from 'react';
import logo from './3.png';
import { Router, useHistory } from 'react-router-dom';

function Header(){
    const mypage = sessionStorage.getItem('userinfo');
    const h = useHistory();
    
    /*API 코드 필요 */
    const logout = ()=>{
        h.push("/");
        sessionStorage.clear();
        console.log("to the home!");
    }
        return(
            <div className="header_div">
                <img className="logo_image" alt="logo" src={logo}/>
                <ul className="menu_list">
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/mentoring">mentoring</Link></li>
                    <li><Link to="/mymentoringlist">mymentoringlist</Link></li>
                    <li><Link to="/community">commuity</Link></li>
                    { mypage ? 
                    <li><Link to="/profile">profile</Link>/<a href="" onClick={logout}>logout</a></li> :
                    <li><Link to="/login">login</Link></li>
                    }  
                </ul>
            </div>
        );
    
}

export default Header;