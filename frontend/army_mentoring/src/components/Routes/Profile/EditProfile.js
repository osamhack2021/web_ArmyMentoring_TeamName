import React, { useContext, useEffect, useState } from "react";
import { Progress } from "reactstrap";
import soldier from "../img/soldier.png";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./EditProfile.scss";
import { UserContext } from '../../../context/Context';
import { _editProfile } from '../../../backend/profile';

function Editprofile({match, history}) {
  const [user, setUser] = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState("");
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=>{
      console.log(user);
      window.scroll({
          top:0,
          left:0,
          behavior:'instant'
      })
    }, []);

  useEffect(()=>{
    const n = document.getElementById('nickname');
    n.value = user.nickname;
    setNickname(user.nickname);
    const d = document.getElementById('description');
    d.value = user.description;
    setDescription(user.description);
    }, [user]);

  const getUserId = ()=>{
    console.log(user);
    if(Object.keys(user).length == 0)
        return -1;
    const url = user.url;
    const t = url.split('/');
    return t[4];
  }
  //임시 change
  const editProfile = (e)=>{
    const user_id = getUserId();
    _editProfile(user, password, nickname, description, '', setUser, user_id)
    .then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err.response);
    })
  }

  const thumbnail= (e)=>{
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
          console.log(reader.result);
          setImgUrl(reader.result);
      }
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
                    <Input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">이름</Label>
                    <Input disabled type="text" id="username" name="username" value={user.username}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">별명</Label>
                    <Input type="text" id="nickname" name="nickname" onChange={(e)=>{setNickname(e.target.value)}}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">자기소개</Label>
                    <Input type="text" id="description" name="description" onChange={(e)=>{setDescription(e.target.value)}}></Input>
                </FormGroup>
                <FormGroup class="form-group">
                    <Label class="label">프로필 사진</Label>
                    <div className='img_select'>
                        <img src={imgUrl}></img>
                        <Input type="file" accept="image/*" id="profileimage" name="profileimage" onChange={thumbnail}></Input>
                        </div>
                </FormGroup>
                <div className='button_set'>
                        <Button onClick={()=>{history.goBack()}}>취소</Button>
                        <Button onClick={()=>{editProfile();history.goBack()}}>변경</Button>
                </div>
            </Form>
        </div>
    </div>
)  
}

export default Editprofile;
