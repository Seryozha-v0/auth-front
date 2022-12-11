import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_BACK_URL,
    withCredentials: true
});

export default instance;