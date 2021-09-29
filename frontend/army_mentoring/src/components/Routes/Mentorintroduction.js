import react, { Component } from "react";
import { Link } from "react-router-dom";

function MentorInfo() {
    return (
      <div className="MentorInfo">
        <h2 className="OneLineIntro">"한줄소개 입니다"</h2>
        <img className="mentor-pic" src="../logo.png" alt="멘토사진" />
        <div className="Summary">
          <h3 className="CareerTitle">간단한 이력</h3>
          <ul ClassName="CareerList" type="none">
            <li>이력1</li>
            <li>이력2</li>
            <li>이력3</li>
          </ul>
        </div>
        <button className="GoMentorProf">멘토 프로필로 이동</button>
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
      <div>
        <ul className="CertList">
          <b>자격증 목록</b>
          {nameList}
        </ul>
        <hr />
      </div>
    );
  }

  function MentoringInfo() {
    const mentoringList = [
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
  
    const mentoringLists = mentoringList.map((mentoringList) => (
      <div className="MentoringList">
        <h4 key={mentoringList.id}>{mentoringList.title}</h4>
        <p key={mentoringList.id}>{mentoringList.text}</p>
      </div>
    ));
  
    return <div>{mentoringLists}</div>;
  }

function MentorIntroduction(){
  return (
    <div>
      <MentorInfo />
      <Certificate />
      <MentoringInfo />
    </div>
  );
};

export default MentorIntroduction;
