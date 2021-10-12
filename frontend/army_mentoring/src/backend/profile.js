import axios from "axios";
import { updateUserContextBySavedToken } from './auth';

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
                password : '123',
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

const _loadPortfolio = async (portfolio_id) => {
    try{
        const response = await axios({
            method : 'GET',
            url : '/portfolio/' + portfolio_id
        });
        return response;
    }catch(error){
        throw error;
    }
}

export { _editProfile, _loadPortfolio }