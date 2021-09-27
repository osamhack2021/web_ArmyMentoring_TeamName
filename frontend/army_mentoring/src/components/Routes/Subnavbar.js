import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Subnavbar.scss';

function Subnavbar(props){

    /* sub nav bar 하이라이팅 */
    const highlighting = (ele)=>{
        const clicked = ele;
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

        const len = props.menu.length;
        for(let i = len-1;i>=0;i--){
            if(window.pageYOffset >= 80 + 600*i){
                let ele = document.getElementById('test').children;
                console.log(ele);
                highlighting(ele[i]);
                break;
            }
        }
    }

    /* sub nav bar 화면 따라가기 */
    const setNavStyle = (e)=>{
        console.log(window.pageYOffset);
        const u = document.getElementById('test');
        if(window.pageYOffset > 80)
            u.className = 'fixedNav';
        else
            u.className = 'staticNav';
        //if(window.pageYOffset > )
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
                {props.menu.map((m)=>{
                    return <li><a href={"#"+m.id}>{m.desc}</a></li>
                })}
            </ul>
        </div>
    )
    //map함수로 메뉴 개수까지 맞춰줘야 함.


}

export default Subnavbar;