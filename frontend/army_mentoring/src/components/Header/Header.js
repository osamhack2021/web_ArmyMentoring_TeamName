import React,{ Component } from "react";
import logo from '../logo.png';

class Header extends Component{
    render(){
        return(
            <>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Hello This is header</h2>
            </>
        )
    }
}

export default Header;