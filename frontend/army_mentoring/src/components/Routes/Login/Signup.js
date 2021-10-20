import React, { useEffect, useState } from "react";
import './Signup.scss';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { _requestSignUp } from '../../../backend/auth';

function Login({match, history}){
    const [imgUrl, setImgUrl] = useState("");
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [profileimage, setProfileimage] = useState(null);

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    const register = ()=>{
        _requestSignUp(username, email, password, nickname, description, profileimage)
        .then(res=>{
            console.log(res);
            history.goBack();
        }).catch(err=>{
            console.log(err.response);
        })
    }

    const thumbnail= (e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        setProfileimage(e.target.files[0]);
        reader.onload = ()=>{
            setImgUrl(reader.result);
        }
    }

    const emailValid = (e)=>{
        const el = e.target;
        const rule = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
        if(rule.test(el.value)){
            el.className = "is-valid form-control";
            setEmail(el.value);
        }else{
            el.className = "is-invalid form-control";
        }
    }

    return(
        <div>
            <div className="signup_body">
                <div className="title">회원가입</div>
                <Form className="form">
                    <FormGroup class="form-group">
                        <Label class="label">이메일</Label>
                        <Input type="email" id="email" name="email" onChange={emailValid }></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">비밀번호</Label>
                        <Input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">이름</Label>
                        <Input type="text" id="username" name="username" onChange={(e)=>{setUsername(e.target.value)}}></Input>
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
                        <img src={imgUrl} alt='img'></img>
                        <Input type="file" accept="image/*" id="profileimage" name="profileimage" onChange={thumbnail}></Input>
                        </div>
                    </FormGroup>
                    <FormGroup class="form-group">
                    <div className='button_set'>
                        <Button className="more" onClick={register}>회원가입</Button>
                    </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )  
}

export default Login;
