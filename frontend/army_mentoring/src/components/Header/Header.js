import './Header.scss';
import { Link} from "react-router-dom";
import React from 'react';

function Header(){
        return(
            <div>
                <header className='header2'>This is Header</header>
                <ul>
                    <li> <Link to="/">home</Link></li>
                    <li> <Link to="/about">about</Link></li>
                    <li> <Link to="/community">commuity</Link></li>
                    <li> <Link to="/qna">qna</Link></li>
                    <li> <Link to="/mypage">mypage</Link></li>
                    
                </ul>
                
            </div>
        );
    
}

export default Header;