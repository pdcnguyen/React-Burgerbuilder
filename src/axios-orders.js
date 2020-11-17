import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-a67a8.firebaseio.com/'
});

export default instance;