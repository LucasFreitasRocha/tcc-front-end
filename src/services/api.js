import axios from 'axios';
const api = axios.create({
    baseURL: 'https://tcc-back-spring.herokuapp.com/'
});
export default api;