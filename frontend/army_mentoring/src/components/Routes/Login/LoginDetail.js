import React, {useEffect, useState, useContext} from "react";
import { Link, useHistory } from "react-router-dom";

import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

import { requestLogin, updateUserContextBySavedToken } from "../../../backend/auth";
import { UserContext } from "../../../context/Context";
import './LoginDetail.scss';


function Login({match}){
    const history=useHistory();
    const [user, setUser]=useContext(UserContext);

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await requestLogin(email, password);
            const token = response.data.Token;
            sessionStorage.setItem('Token', token);
            await updateUserContextBySavedToken(setUser);
            history.goBack();
        } catch (error) {
            console.error(error.response.data)
        }
    }

    return(
        <div>
            <div className="login_body" id="login.js">
                <div className="title">로그인</div>
                <Form className="form">
                    <FormGroup class="form-group">
                        <Label class="label">이메일</Label>
                        <Input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email"></Input>
                    </FormGroup>
                    <FormGroup class="form-group">
                        <Label class="label">비밀번호</Label>
                        <Input onChange={e => setPassword(e.target.value)}  type="password" id="password" name="password"></Input>
                    </FormGroup>
                    <Button id="login_button" onClick={onLogin}>로그인</Button>
                    <Link to={`${match.url}/signup`}>회원가입</Link>
                </Form>
            </div>
        </div>
    )  
}

export default Login;
