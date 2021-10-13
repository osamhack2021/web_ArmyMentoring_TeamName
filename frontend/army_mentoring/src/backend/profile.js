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

const _loadPortfolioItem = async (portfolio_item_id) => {
    try{
        const response = await axios({
            method : 'GET',
            url : '/portfolio-item/' + portfolio_item_id
        });
        return response;
    }catch(error){
        throw error;
    }
}


const _deletePortfolio = async (portfolio_id)=>{
    try{
        const response = await axios({
            method : 'DELETE',
            url : '/portfolio/' + portfolio_id
        })
        return response;
    } catch (error){
        throw error;
    }
}

const _addPortfolio = async (user_id, title) => {
    try{
        const response = axios({
            method : 'POST',
            url : '/portfolio',
            data : { 
                title : title,
                portfolio_items : [],
                specification_cards : [],
                user : 'https://guntor-guntee-data-server.herokuapp.com/user/' + user_id
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _addPortfolioItem = async (title, content, portfolio_id, order) => {
    try{
        const response = axios({
            method : 'POST',
            url : '/portfolio-item',
            data : { 
                title : title,
                content : content,
                portfolio : 'https://guntor-guntee-data-server.herokuapp.com/portfolio/' + portfolio_id,
                order : order
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}


export { _editProfile, _loadPortfolio, _addPortfolio, _loadPortfolioItem, _deletePortfolio, _addPortfolioItem}