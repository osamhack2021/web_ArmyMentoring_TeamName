import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import soldier from "../img/soldier.png";
import "./ProfileDetail.scss";

function Profile({match}) {

  let [userInfo, setUserInfo] = useState();
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
  
  const user =
  {
    username: "김00",
    nickname: "열혈 멘토",
    email: "guntor@email.com",
    profileimage:  soldier,
    level : 6,
    experience_point: 25,
    description : "한줄 소개"
  }


  return (
    <div className="profile">
      <div className="intro">
        <img className="my-img" src={user.profileimage} alt="내 사진"></img>
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
      <div className="mentorings">{mentorInfo.map((m) => (<li key={m.id}>{m.title}</li>))}</div>
      <div className="mentorings">{menteeInfo.map((m) => (<li key={m.id}>{m.title}</li>))}</div>
    </div>
  );
}

export default Profile;

/*
    const getUserInfo = ()=>{
        const token = sessionStorage.getItem('token');
        axios({                                 //유저정보 요청
            method : 'GET',
            url : 'https://???/user',
            headers : { "token" : token.token }
        }).then(function(res)=>{    
            const id = res.id;
            axios({
              method : 'GET',
              url : 'https://???/user',
              headers : { "token" : token.token }
            }).then(function(res)=>{            
                const response = res.data;
                const userinfo = {
                  response.username,
                  response.nickname,
                  response.email,
                  response.profile_image,
                  response.level,
                  response.experience_point,
                  response.description
                }
                setUserInfo(userInfo);  //받은 유저정보를 state에 저장
                const mentoring = {
                  response.opened_mentoring,
                  response.participated_mentoring
                }
                setMentoringInfo(mentoring);  //참여중인 멘토링
              });
    }
*/