import React from "react";
import './Footer.scss';

function Footer(){
   
        return(
            <div className="footer">
                <div className="copyright">
                    Copyright ⓒ 2021.&nbsp;&nbsp;<span style={{fontWeight: 700}}>EarlyFried</span>&nbsp;&nbsp;All rights reserved.
                </div>
                <br/>
                <div className="contact">
                    {/* Contect. &nbsp;<span style={{fontWeight: 500}}>Phone</span>: 000-0000-0000 &nbsp;&nbsp;<span style={{fontWeight: 500}}>e-mail</span>: test@test.com */}
                </div>
            </div>
        )
    
}

export default Footer;