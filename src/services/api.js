import axios from 'axios';
const api = axios.create({
    baseURL: 'https://tcc-back-spring.herokuapp.com/'
});
api.defaults.headers['Access-Control-Allow-Origin'] = '*';
export default api;