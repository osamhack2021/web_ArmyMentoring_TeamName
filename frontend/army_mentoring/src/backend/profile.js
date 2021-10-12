import axios from "axios";
import { UserContext } from "../context/Context";
import { updateUserContextBySavedToken } from './auth';

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

const _editProfile = async (user, password, nickname, description, profileimage, setUser, user_id) =>{
    const formData = new FormData();
    formData.append('profileimage', profileimage);
    try{
        const response = await axios({
            method : 'PUT',
            url : '/user/'+ user_id,
            data : {
                email : user.email,
                username : user.username,
                password :password,
                nickname : nickname,
                description : description,
                profile_image : null,
            }
        })
        await updateUserContextBySavedToken(setUser);
        return response;
    } catch (error){
        throw error;
    }
}


export { _editProfile }