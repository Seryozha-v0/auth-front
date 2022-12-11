import axios from 'axios';

const instance = axios.create({
    baseURL: (process.env.REACT_BACK_URL || 'http://localhost:4400'),
    withCredentials: true
});

export default instance;