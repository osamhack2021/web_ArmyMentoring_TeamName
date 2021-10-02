import React, {useState, useEffect } from 'react';
import './Community.scss';

function Community(props) {

  const [menu,setMenu] = useState([]); 
  
  useEffect(() => {
      setMenu([
        {id:'1', title:'제목1',contents:'내용1' },
        {id:'2', title:'제목2 ', contents:'내용2'},
        {id:'3', title:'제목3', contents:'내용3'},
        {id:'4', title:'제목4 ',contents:'내용4'},
        {id:'5', title:'제목5',contents:'내용5'}
    ]);
    }, []);
    return (
    <div>

              <div className='community_board'>
                {menu.map((menu) => (
                  <div key={menu.id} className='community_post'>
                    <div>{menu.id}</div>
                    <h2>{menu.title}</h2>
                    <h4>{menu.contents}</h4>
                  </div>
                ))}
              </div>
    </div>
    );
  }

  export default Community;