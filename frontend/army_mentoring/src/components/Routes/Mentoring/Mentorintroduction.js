import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Mentorintroduction.scss";
import soldier from "../img/soldier.png";
import reactimg from "./react.png";
import tomcatimg from "./tomcat.png";
import Subnavbar from '../Subnavbar';
import axios from 'axios';

function MentorInfo() {

  // const userInfo = {
  //   url = "/users",
  //   method: 'GET',
  //   header:{
  //     Authorization: "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b";
  //     'content-type': "application/json";
  //   }
  // }

//   const showInfo = ()=>{
//     axios({                                 //유저정보 요청
//         method : 'GET',
//         url : 'https://???/auth/user/'
//     }).then(function(res)=>{                
//         const response = res.data;
//         setUserInfo(JSON.parse(response));  //받은 유저정보를 state에 저장
//     });
// }
    // const onLoggin = ()=>{
    //     const token = sessionStorage.getItem('token');
    //     axios({
    //         method : 'GET',
    //         url : 'https://???/auth/logout',
    //         headers : { 'token' : token }
    //     }).then(function(res)=>{
    //         const response = res.data;       //서버에서 받은 json 데이터
    //         //에러 발생시?
    //         document.location.href = "/";   //홈페이지로 이동
    //     })
    // }


//********************************************************* */
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/user').then((response) => {
//       setPost(response.data);
//     });
//   }, []);

//   console.log(post);

// //

  // axios.get('http://127.0.0.1:8000/user/')
  // .then(function (response) {
  //   console.log(response.data);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });  
  
  // axios.get('http://127.0.0.1:8000/auth/user/1')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });  

  // const getUser = async ()=>{
  //   const userInfo = await axios.get('http://127.0.0.1:8000/user/');
  //   console.log(userInfo);
  // };

  // this.getUser();

  // axios.getUri('http://127.0.0.1:8000/user HTTP/1.1')

  let [mentorInfo, setMentorInfo] = useState([
  ]);

  const mentor =
  {
    username: "김00",
    nickname: "열혈 멘토",
    email: "guntor@email.com",
    profileimage:  soldier,
    experience_point: 25,
    description : "한줄 소개"
  };
  return (
    <div className="MentorInfo" id="MentorInfos">
      <h2 className="OneLineIntro">{mentor.description}</h2>
      <div className="MentorProfile">
        <b className="blank"></b>
        <div className="mentor-img">
          <img className="mentor-pic" src={mentor.profileimage} alt="멘토사진"></img>
          <div className="username">{mentor.username}</div>
        </div>
        <div className="updown"></div>
        <b className="blank"></b>
        <div className="Summary">
          <h3 className="CareerTitle">간단한 이력</h3>
          <ul ClassName="CareerList" type="none">
            <li>이력1</li>
            <li>이력2</li>
            <li>이력3</li>
          </ul>
        </div>
        <b className="blank"></b>
        <b className="blank"></b>
        <b className="blank"></b>
        <b className="blank"></b>
        <b className="blank"></b>
        <button className="GoMentorProf">멘토 프로필로 이동</button>
      </div>
    </div>
  );
}

function Project() {
  const project = [
    {
      id: 1,
      title: "React OpenSource Project",
      text: "저는 React 프로젝트에 참여해서 이런 걸 만들었습니다.",
      image: reactimg
    },
    {
      id: 2,
      title: "Tomcat OpenSource Project",
      text: "저는 Tomcat 프로젝트에 참여해서 이런 걸 만들었습니다.",
      image: tomcatimg
    }
  ];

  const projects = project.map((project) => (
    <div key={project.id} className="Card">
      <img src={project.image} alt={project.title} />
      <h2>{project.title}</h2>
      <div className="Cardtext">{project.text}</div>
    </div>
  ));
  return (
    <div className="Project" id="Projects">
      <div className="CardList">{projects}</div>
    </div>
  );
}

function Certificate() {
  const names = [
    { id: 1, text: "정보처리기사" },
    { id: 2, text: "리눅스마스터" },
    { id: 3, text: "etc" }
  ];

  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);

  return (
    <div className="Certificate" id="Certificates">
      <ul className="CertList">
        <b>자격증 목록</b>
        {nameList}
      </ul>
    </div>
  );
}

function MentoringInfo() {
  const mentorings = [
    {
      id: 1,
      title: "#1. 멘토링 제목",
      text:
        "저는 이런 멘토링 주제를 가지고 있고 이런식으로 과제를 던져주고 이런식으로 멘토링 할 예정입니다. 이런 능력을 기르고 싶은 분은 연락주세요"
    },
    {
      id: 2,
      title: "#2. 멘토링 제목",
      text:
        "저는 이런 멘토링 주제를 가지고 있고 이런식으로 과제를 던져주고 이런식으로 멘토링 할 예정입니다. 이런 능력을 기르고 싶은 분은 연락주세요"
    }
  ];

  const mentoringLists = mentorings.map((mentoring) => (
    <div className="Mentoring" key={mentoring.id} id="Mentorings">
      <h4 className="MentoringTitle" key={mentoring.id}>
        {mentoring.title}
      </h4>
      <p className="MentoringText" key={mentoring.id}>
        {mentoring.text}
      </p>
    </div>
  ));

  return <div className="MentoringInfo" id="MentoringInfos">{mentoringLists}</div>;
}

function MentoringReview() {



  const reviews = [
    {
      id: "육군 일병 김00",
      title: "#1. 프로그래밍 멘토링 후기",
      text: "초보자도 쉽게 할 수 있습니다!"
    },
    {
      id: "해군 상병 이00",
      title: "#2. 운동 멘토링 후기",
      text: "지금까지 이런 멘토링은 없었다! 이것은 멘토링인가 PT인가."
    }
    // {
    //   id: "공군 병장 박00",
    //   title: "#3. 진로 멘토링 후기",
    //   text: "지금까지 이런 멘토링은 없었다! 이것은 멘토링인가 PT인가."
    // }
  ];

  const reviewList = reviews.map((review) => (
    <div className="Review" key={review.id}>
      <h4 className="ReviewTitle" key={review.id}>
        {review.title}
      </h4>
      <p className="ReviewText" key={review.id}>
        {review.text}
      </p>
      <div className="Id">-{review.id}-</div>
    </div>
  ));

  return <div className="ReviewInfo" id="MentoringReviews">{reviewList}</div>;
}


function MentorIntroduction() {

  const menu = 
    [
        {id:'MentorInfos', desc:'멘토소개'},
        {id:'Projects', desc:'보유 능력 카드'},
        {id:'Certificates', desc:'자격증'},
        {id:'MentoringInfos', desc:'멘토링소개'},
        {id:'MentoringReviews', desc: '멘토링 후기'}
    ];

    useEffect(()=>{
      window.scroll({
          top:0,
          left:0,
          behavior:'instant'
      })}, []
    );


  return (
    <div>
        <Subnavbar menu={menu}></Subnavbar>
        <div className="MentorIntro">
          <MentorInfo id="MentorInfos"/>
          <div className="Empty"></div>
          <Project id="Projects"/>
          <Certificate id="Certificates"/>
          <MentoringInfo id='MentoringInfos'/>
          <MentoringReview id=' MentoringReviews'/>
        </div>
    </div>
  );
}

export default MentorIntroduction;
