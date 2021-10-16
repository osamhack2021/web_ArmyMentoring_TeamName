import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import { _loadMentoring, _loadPortfolio } from '../../../backend/profile';
import "./ProfileDetail.scss";
import { UserContext } from '../../../context/Context';

function Profile({match}) {
  let isMe = false;
  const [u, setU] = useContext(UserContext);
  const [other, setOther] = useState({});
  let user;
  const getUserId = ()=>{
    if(Object.keys(u).length == 0)
        return -1;
    const url = u.url;
    const t = url.split('/');
    return t[4];
  }
  if(getUserId() == match.params.id)
    isMe = true;
  if(isMe)
    user = u;
  else
    user = other;

  const [menteeM, setMenteeM] = useState([]);
  const [mentorM, setMentorM] = useState([]);

  useEffect(()=>{
    load();
  }, [])

  const load = () =>{
    Promise.all(
      user.opened_mentoring.map((url)=>{
        let t = url.split('/');
        let m_id = t[4];
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
      setMentorM(res);
    })
    .catch(err=>{
      console.log(err);
    })

    Promise.all(
      user.participated_mentoring.map((url)=>{
        let t = url.split('/');
        let m_id = t[4];
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
      setMenteeM(res);
    })
    .catch(err=>{
      console.log(err);
    })

  }
  
  return (
    <div className="profile">
      <div className="pro_title">내 프로필</div>
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
        <Link to={`${match.url}/chat`} className="button">메시지 보내기</Link>
        <Link to={`${match.url}/edit`} className="button">개인정보 수정</Link>
      </div>
      <div className="mentorings">{
      mentorM.map((m)=>{
        let t = m.url.split('/');
        let mid = t[4];
        return (<Link to={`/mymentoring/mentor/${mid}`}><li>{m.title}</li></Link>)
        })}
      </div>
      <div className="mentorings">{
      menteeM.map((m) =>{
        let t = m.url.split('/');
        let mid = t[4];
        return (<Link to={`/mymentoring/mentee/${mid}`}><li>{m.title}</li></Link>)
        })}
      </div>
    </div>
  );
}

export default Profile;
