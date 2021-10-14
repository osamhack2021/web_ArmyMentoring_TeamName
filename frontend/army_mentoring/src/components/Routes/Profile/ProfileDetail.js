import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import { _loadMentoring, _loadPortfolio } from '../../../backend/profile';
import "./ProfileDetail.scss";
import { UserContext } from '../../../context/Context';

function Profile({match}) {
  const [user, setUser] = useContext(UserContext);
  const [menteeM, setMenteeM] = useState([]);
  const [mentorM, setMentorM] = useState([]);

  useEffect(()=>{
    load();
    console.log(user);
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
      console.log(res);
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
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  let [mentorInfo, setMentorInfo] = useState([
                                              {
                                                id: 1,
                                                title: "#1. 멘토링 제목"
                                              },
                                              {
                                                id: 2,
                                                title: "#2. 멘토링 제목"
                                              }
                                            ]);
  let [menteeInfo, setMenteeInfo] = useState([
                                              {
                                                id: 1,
                                                title: "멘티로 참여하는 멘토링 #1"
                                              },
                                              {
                                                id: 2,
                                                title: "멘티로 참여하는 멘토링 #2"
                                              }
                                            ]);

  return (
    <div className="profile">
      <div className="intro">
        <img className="my-img" src={user.profile_image} alt="내 사진"></img>
        <div className="desc-col">
          <h1>{user.description}</h1>
          <h3>{user.username} / {user.nickname} / {user.email}</h3>
          <div>
            <span>lv. {user.level}</span>
            <Progress value={user.experience_point} />
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
        return (<Link><li>{m.title}</li></Link>)
        })}
      </div>
      <div className="mentorings">{
      menteeM.map((m) =>{
        return (<Link><li>{m.title}</li></Link>)
        })}
      </div>
    </div>
  );
}

export default Profile;
