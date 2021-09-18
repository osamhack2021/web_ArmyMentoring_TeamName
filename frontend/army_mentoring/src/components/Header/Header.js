import React,{ Component } from "react";
import logo from '../logo.png';
import './Header.scss';
class Header extends Component{
    render(){
        return(
           
            
    <Header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="header1">헤더입니다</h1>
    </Header>
           
        )
    }
}

export default Header;