import './Header.scss';
import {Link} from "react-router-dom";
import React from 'react';
import logo from './3.png';
function Header(){
    const mypage = (sessionStorage.getItem('userinfo') == null) ? "login" : "logout/mypage";

        return(
            <div className="header_div">
                <img className="logo_image" alt="logo" src={logo}/>
                <ul className="menu_list">
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/mentoring">mentoring</Link></li>
                    <li><Link to="/mymentoring">mymentoring</Link></li>
                    <li><Link to="/community">commuity</Link></li>
                    <li><Link to="/mypage">{mypage}</Link></li>
                </ul>
            </div>
        );
    
}

export default Header;