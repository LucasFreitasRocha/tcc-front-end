import axios from 'axios';
const api = axios.create({
    baseURL: 'https://tcc-back-spring.herokuapp.com/'
    //baseURL: 'http://localhost:8080/'
});
export default api;