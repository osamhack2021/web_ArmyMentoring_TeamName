import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import soldier from "../img/soldier.png";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./EditProfile.scss";
import axios from "axios";

function Editprofile() {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(()=>{
      window.scroll({
          top:0,
          left:0,
          behavior:'instant'
      })}, []
  );

  //임시 register
  const change = ()=>{
      const token = sessionStorage.getItem('token');
      //user id 가져오고
      //user update 요청
  }

  const thumbnail= (e)=>{
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
          console.log(reader.result);
          setImgUrl(reader.result);
      }
  }

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

  return(
    <div>
        <div className="editprofile_body">
            <div className="title">개인정보수정</div>
            <Form className="form">
                <FormGroup class="form-group">
                    <Label class="label">이메일</Label>
                    <Input disabled type="email" id="email" name="email" value={user.email}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">비밀번호</Label>
                    <Input type="password" id="password" name="password"></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">이름</Label>
                    <Input disabled type="text" id="username" name="username" value={user.username}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">별명</Label>
                    <Input type="text" id="nickname" name="nickname" value={user.nickname}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">자기소개</Label>
                    <Input type="text" id="description" name="description" value={user.description}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">프로필 사진</Label>
                    <img src={imgUrl}></img>
                    <Input type="file" accept="image/*" id="profileimage" name="profileimage" onChange={thumbnail}></Input>
                </FormGroup>
                <div className="buttons">
                    <Link to='/profile' id="cancel_button">취소</Link>
                    <Link to='/profile' id="change_button" onClick={change}>변경</Link>
                </div>
            </Form>
        </div>
    </div>
)  
}

export default Editprofile;