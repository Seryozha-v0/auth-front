import axios from 'axios';

const instance = axios.create({
    // baseURL: process.env.REACT_BACK_URL,
    baseURL: 'https://auth-back-six.vercel.app',
    withCredentials: true
});

export default instance;