import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.224.144.166:8080',
});

export default api;
