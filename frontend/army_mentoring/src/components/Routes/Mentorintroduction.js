import react, { Component } from "react";
import { Link } from "react-router-dom";
import "./MentorIntroduction.scss";
import soldier from "./soldier.png";
import Subnavbar from './Subnavbar';

function MentorInfo() {
  return (
    <div className="MentorInfo">
      <h2 className="OneLineIntro">"한줄소개 입니다"</h2>
      <div className="MentorProfile">
        <b className="blank"></b>
        <img className="mentor-pic" src={soldier} alt="멘토사진"></img>
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
      text: "저는 이런 프로젝트에 참여해서 이런 걸 만들었습니다.",
      img: "./react.png"
    },
    {
      id: 2,
      title: "Tomcat OpenSource Project",
      text: "저는 이런 프로젝트에 참여해서 이런 걸 만들었습니다.",
      img: "./tomcat.png"
    }
  ];

  const projects = project.map((project) => (
    <div key={project.id} className="Card">
      <img src={project.img} alt={project.title} />
      <h2>{project.title}</h2>
      <div className="Cardtext">{project.text}</div>
    </div>
  ));
  return (
    <div className="Project">
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
    <div className="Certificate">
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
    <div className="Mentoring" key={mentoring.id}>
      <h4 className="MentoringTitle" key={mentoring.id}>
        {mentoring.title}
      </h4>
      <p className="MentoringText" key={mentoring.id}>
        {mentoring.text}
      </p>
    </div>
  ));

  return <div className="MentoringInfo">{mentoringLists}</div>;
}

function MentorIntroduction() {
  const menu = 
    [
        {id:'sgstmentoring', desc:'추천 멘토링'},
        {id:'sgstmentor', desc:'추천 멘토'},
        {id:'srchmentoring', desc:'멘토링 검색'}
    ]
  return (
    <div>
        <Subnavbar menu={menu}></Subnavbar>
        <div className="MentorIntro">
          <MentorInfo />
         <div className="Empty"></div>
          <Project />
          <Certificate />
          <MentoringInfo />
        </div>
    </div>
  );
}

export default MentorIntroduction;
