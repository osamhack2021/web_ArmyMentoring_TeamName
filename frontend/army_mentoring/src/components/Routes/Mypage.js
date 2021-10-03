import React, {useState, useEffect } from 'react';
import './Mypage.scss';


function Mypage(props) {

    const [user,setUser] = useState([]); 
    
    useEffect(() => {
        setUser([
            {
                "username": "굳건이1",
                "email": "roka1@roka.com",
                "nickname": "굳건이1",
                "description": "hello! this is 굳건이1",
                "password": "roka1"
            }
      ]);
      }, []);
      
    return( 
        
            <div>
                <div className='my_profile'>
                    <img/>
                    <div>{user[0].description}</div>
                    <div>이름/ 닉네임 /메일</div>

                </div>

            </div>
        );
  }

  export default Mypage;