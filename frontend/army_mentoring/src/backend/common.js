import axios from 'axios';

const getFromUrl = async (url) => {
    try {
        const response = axios.get(url);
        return response;
    } catch (error) {
        throw(error);
    }
};

export {getFromUrl};