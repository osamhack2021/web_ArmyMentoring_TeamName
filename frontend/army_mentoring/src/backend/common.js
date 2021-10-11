import axios from 'axios';
import { BACKEND } from '../CONST';


const getFromUrl = async (url) => {
    try {
        const response = axios.get(url);
        return response;
    } catch (error) {
        throw(error);
    }
};

const updateAxiosSettings = () => {
    const token=sessionStorage.getItem('Token');
    axios.defaults.baseURL = BACKEND.DATA_SERVER_BASE_URL;
    if (token){
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
}


export {getFromUrl, updateAxiosSettings};