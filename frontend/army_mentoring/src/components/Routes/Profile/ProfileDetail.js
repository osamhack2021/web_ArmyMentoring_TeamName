import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import { _loadMentoring, _loadUser } from '../../../backend/profile';
import "./ProfileDetail.scss";
import { UserContext } from '../../../context/Context';

function Profile({match}) {
  const [me, setMe] = useContext(UserContext);
  const [other, setOther] = useState({});
  const [menteeMentorings, setMenteeMentorings] = useState([]);
  const [mentorMentorings, setMentorMentorings] = useState([]);

  let isMe = false;
  let user;

  const getUserId = ()=>{
    if(Object.keys(me).length == 0)
        return -1;
    return getId(me.url);
  }

  const getId = (url)=>{
    const t = url.split('/');
    return t[4];
  }

  if(getUserId() == match.params.id)
    isMe = true;

  if(isMe)
    user = me;
  else
    user = other;

  useEffect(()=>{
    load();
  }, [])


  const loadMentorings = (mentorings, setMentoring)=>{
    _loadUser(match.params.id)
    .then(res=>{
      setOther(res.data);
      Promise.all(
        mentorings.map((url)=>{
          let m_id = getId(url);
          return _loadMentoring(m_id)
                .then(res=>{
                  return res.data;
                })
                .catch(err=>{
                  console.log(err);
                })
        })
      )
      .then(res=>{
        setMentoring(res);
      })
      .catch(err=>{
        console.log(err);
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
  
  const load = () =>{
    loadMentorings(user.opened_mentoring, setMentorMentorings);
    loadMentorings(user.participated_mentoring, setMenteeMentorings);

    const m = document.getElementById('message');
    const e = document.getElementById('edit');
    console.log(m);
    console.log(e);
    if(isMe){
      m.className = 'button h';
      e.className = 'button';
    }
    else{
      m.className = 'button';
      e.className = 'button h';
    }
  }
  
  return (
    <div className="profile">
      <div className="pro_title">프로필</div>
      <div className="intro">
        <img className="my-img" src={user.profile_image} alt="내 사진"></img>
        <div className="desc-col">
          <h1>"{user.description}"</h1>
          <h3> {user.username} / {user.nickname} / {user.email}</h3>
          <div className='level'>
            <span>lv. {user.level} </span>
            <Progress className='progress_bar' value={user.experience_point / 100} />
          </div>
        </div>
        <div className="button-col">
          <Link to={`${match.url}/portfolio`} className="go-portfolio">포트폴리오 보기</Link>
        </div>
      </div>
      <div className="buttons">
        <Link to={`${match.url}/chat`} className="button" id="message">메시지 보내기</Link>
        <Link to={`${match.url}/edit`} className="button" id='edit'>개인정보 수정</Link>
      </div>
      <div className="mentorings">
        <div className='mentoring-list-title'>멘토 역할 멘토링</div>
        {
          mentorMentorings.map((m)=>{
            let t = m.url.split('/');
            let mid = t[4];
            return (
              <ul className='mentoring-lists'>
                <Link to={`/mymentoring/mentor/${mid}`}><li>{m.title}</li></Link>
              </ul>
            )
            })
        }
      </div>
      <div className="mentorings">
        <div className='mentoring-list-title'>멘티 역할 멘토링</div>
        
        {
          menteeMentorings.map((m) =>{
            let t = m.url.split('/');
            let mid = t[4];
            return (
            <ul className='mentoring-lists'>
            <Link to={`/mymentoring/mentee/${mid}`}><li>{m.title}</li></Link>
            </ul>
            )
          })
        }
        
      </div>
    </div>
  );
}

export default Profile;
