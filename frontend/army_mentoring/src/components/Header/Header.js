import './Header.scss';
import { Link} from "react-router-dom";
import React from 'react';
import logo from './3.png';
function Header(){
        return(
            <div className="headerDiv">
                <img className="logoImage" alt="logo" src={logo}/>
                
                <ul>
                    <li> <Link to="/">home</Link></li>
                    <li ><Link to="/about">about</Link></li>
                    <li> <Link to="/community">commuity</Link></li>
                    <li> <Link to="/qna">qna</Link></li>
                    <li> <Link to="/mypage">mypage</Link></li>
                    
                </ul>
                
            </div>
        );
    
}

export default Header;