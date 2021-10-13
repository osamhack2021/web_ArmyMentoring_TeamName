import axios from "axios";
import { updateAxiosSettings } from "./common";


const requestLogin = async (email, password) => {
    try {
        const response = await axios.post(
            'auth/login',
            {
                "email": email,
                "password": password
            });
        return response;
    } catch (error) {
        throw(error);
    }
}

const requestAuthenticatedUser = async () => {
    try {
        const response = await axios.get('auth/user');
        return response;
    } catch (error) {
        throw(error);
    }
}

const updateUserContextBySavedToken = async (setUser) => {
    try{
        updateAxiosSettings();
        const user=(await requestAuthenticatedUser()).data;
        setUser(user);
        return user;
    } catch (error) {
        throw(error);
    }
}

const _requestSignUp = async (username, email, password, nickname, description, profileimage) => {
    try {
        const response = await axios({
            method:'POST',
            url : '/auth/register',
            data : {
                username : username,
                email : email,
                password : password,
                nickname : nickname,
                description : description,
                profileimage : profileimage
            }
        })
        return response;
    } catch (error) {
        throw(error);
    }
}

const _requestLogout = async (setUser) => {
    try {
        const response = await axios({
            method:'GET',
            url : '/auth/logout'
        })
        setUser({});
        sessionStorage.removeItem('Token');
        console.log(1);//이거 없으면 session remove가 안됨... 뭐노...
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        updateAxiosSettings();
        return response;
    } catch (error) {
        throw(error);
    }
}

export {requestLogin, requestAuthenticatedUser, updateUserContextBySavedToken, _requestSignUp, _requestLogout }