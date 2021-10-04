import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import soldier from "../img/soldier.png";
import "./Profile.scss";

function Editprofile() {



  return (
    <div className="profile">
      <div className="Intro">
        <img className="MyImg" src={soldier} alt="내 사진"></img>
        <h1>한줄소개</h1>
        <input type="textarea" /*onChange={autosave}*/></input>
        <h3>유저이름/닉네임/이메일</h3>
        <input type="textarea" /*onChange={autosave}*/></input>
      </div>
      <button /*onClick={}*/>수정</button><Link to='/profile'>취소</Link>
    </div>
  );
}

export default Editprofile;