import React, {useState, useEffect } from 'react';
import './Community.scss';
import Comments from './Comments';

function Community(props) {

  const [menu,setMenu] = useState([]); 
  
  useEffect(() => {
      setMenu([
        {id:'1', title:'제목1',contents:'내용1',comments:'1',likes:'1' },
        {id:'2', title:'제목2 ', contents:'내용2',comments:'2',likes:'1' },
        {id:'3', title:'제목3', contents:'내용3',comments:'3',likes:'1' },
        {id:'4', title:'제목4 ',contents:'내용4',comments:'4',likes:'1' },
        {id:'5', title:'제목5',contents:'내용5',comments:'5',likes:'1' }
    ]);
    }, []);
    return (
    <div>

              <div className='community_board'>
                {menu.map((menu) => (
                  <div key={menu.id} className='community_post'>
                    <div>{menu.id}</div>
                    <div className='community_title'>{menu.title}</div>
                    <div className='community_contents'>{menu.contents}</div>
                    <div className='community_statistics'>
                      <div className='community_comments'>댓글 {menu.comments}</div>
                      <div className='community_likes'>좋아요 {menu.likes}</div>
                    </div>
                    <Comments></Comments>
                  </div>
                ))}
              </div>
    </div>
    );
  }

  export default Community;