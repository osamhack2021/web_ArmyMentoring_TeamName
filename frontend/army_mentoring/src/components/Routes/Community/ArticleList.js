import React, {useState, useEffect } from 'react';
import './ArticleList.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticleList({match}) {

  const [menu,setMenu] = useState([]);
  //실제로는 sessionStorage에서 가져올 듯?
  const token = '905e125ab3ee40e3a74f6915c9dd3f540b987dc6';
  axios({
      method : 'GET',
      url : 'https://guntor-guntee-data-server.herokuapp.com/auth/user/',
      headers : { Authorization : '905e125ab3ee40e3a74f6915c9dd3f540b987dc6'}
  }).then((res)=>{
      console.log(res);
  }).catch((err)=>{
      console.log(err);
  });
/*
  axios({
      method : 'POST',
      url : 'https://guntor-guntee-data-server.herokuapp.com/question',
      header : { Authorization : token },
      data : {
          title : '테스트 게시글 1',
          content : `테스트 내용입니다리 군토군티 화이팅 조기튀김 화이팅
          좀만 더 힘내요 근데 솔직히 백엔드 연동하는 거 재밌고 신기하다
          훈련만 없으면 진짜 재밌게 불안하지 않게 할텐데 과연 시간이 충분할지
          모르겠네용`,
          user : 'https://guntor-guntee-data-server.herokuapp.com/user/1',
          liked_user : [] 
      }
  }).then((res)=>{
      console.log(res);
  }).catch((err)=>{
      console.log(err);
  });
  /* questions 목록 불러오기
  axios({
      method : 'GET',
      url : 'https://guntor-guntee-data-server.herokuapp.com/question'
  }).then((res)=>{
      console.log(res);
  }).catch((err)=>{
      console.log(err);
  });
  */

  useEffect(() => {
      setMenu([
        {
            id:0, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        },
        {
            id:1, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        },
        {
            id:2, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        },
        {
            id:3, title:'What is Lorem Ipsum?',contents:`Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type and scrambled 
            it to make a type specimen book. It has survived not only five centuries, but also 
            the leap into electronic typesetting...`
            ,comments:1,likes:1 
        }
    ]);
    }, []);
    return (
    <div>
        <div className='community_board'>
        {menu.map((menu) => (
            <Link to={`${match.url}/${menu.id}`}>
                <div key={menu.id} className='community_post'>
                    <div>{"id : " + menu.id}</div>
                    <div className='community_title'>{menu.title}</div>
                    <div className='community_contents'>{menu.contents}</div>
                    <div className='community_statistics'>
                        <div className='community_comments'>댓글 {menu.comments}</div>
                        <div className='community_likes'>좋아요 {menu.likes}</div>
                    </div>
                </div>
            </Link>
        ))}
        </div>
    </div>
    );
  }

  export default ArticleList;