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


export {requestLogin, requestAuthenticatedUser, updateUserContextBySavedToken}