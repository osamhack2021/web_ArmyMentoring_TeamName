import React, { useEffect } from 'react';
import './Subnavbar.scss';

function Subnavbar(props){

    /* sub nav bar의 선택된 list만 하이라이팅 */
    const highlighting = (el)=>{
        const target = el;
        if(target == null || target == undefined){
            console.log('target is null');
            return;
        }
        target.className = "highlighted";
        
        var sib = target.nextSibling;
        while(sib){
            sib.className = "";
            sib = sib.nextSibling;
        }
        sib = target.previousSibling;
        while(sib){
            sib.className = "";
            sib = sib.previousSibling;
        }
    }

    /* sub nav bar 화면 따라가기 및 하이라이팅 */
    const setNavStyle = ()=>{
        const u = document.getElementById('container');
        if(u == null || u == undefined)
            return;
        if(window.pageYOffset > 80)
            u.className = 'fixedNav';
        else
            u.className = 'staticNav';

        const len = props.menu.length;
        for(let i = len-1;i>=0;i--){
            if(window.pageYOffset >= 80 + 600*i){
                let ele = document.getElementById('container').children;
                highlighting(ele[i]);
                break;
            }
        }
    }
    
    useEffect(()=>{
        window.addEventListener('scroll', setNavStyle);
        return ()=>{
            window.removeEventListener('scroll', setNavStyle);
        }
    }, []);

    return (
        <div className="subnavbar">
            <ul id="container">
                {props.menu.map((m)=>{
                    return <li><a href={"#"+m.id}>{m.desc}</a></li>
                })}
            </ul>
        </div>
    )

}

export default Subnavbar;