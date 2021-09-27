import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Subnavbar.scss';

function Subnavbar(props){

    /* sub nav bar 하이라이팅 */
    const highlighting = (e)=>{
        const clicked = e.target.parentNode;
        clicked.className = "clicked";
        
        var sib = clicked.nextSibling;
        while(sib){
            sib.className = "";
            sib = sib.nextSibling;
        }
        var sib = clicked.previousSibling;
        while(sib){
            sib.className = "";
            sib = sib.previousSibling;
        }
    }

    const setNavHighlighting = ()=>{
        const u = document.getElementById('test');
        if(window.pageYOffset > 80)
            u.className = 'fixedNav';
        else
            u.className = 'staticNav';
    }

    /* sub nav bar 화면 따라가기 */
    const setNavStyle = (e)=>{
        const u = document.getElementById('test');
        if(window.pageYOffset > 80)
            u.className = 'fixedNav';
        else
            u.className = 'staticNav';
    }

    useEffect(()=>{
        window.addEventListener('scroll', setNavStyle);
        window.addEventListener('scroll', setNavHighlighting);
        return ()=>{
            window.removeEventListener('scroll', setNavHighlighting);
        }
    });

    return ( 
        <div className="subnavbar">
            <ul id="test">
                <li onClick={highlighting}><a href={"#"+props.t.id[0]}>{props.t.menu[0]}</a></li>
                <li onClick={highlighting}><a href={"#"+props.t.id[1]}>{props.t.menu[1]}</a></li>
                <li onClick={highlighting}><a href={"#"+props.t.id[2]}>{props.t.menu[2]}</a></li>
            </ul>
        </div>
    )
    //map함수로 메뉴 개수까지 맞춰줘야 함.


}

export default Subnavbar;