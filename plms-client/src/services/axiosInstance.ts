import axios from 'axios';
import Config from '../utils/config';

const axiosInstance = axios.create({
  baseURL: `${Config.API_URL}:${Config.API_PORT}/api`,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer' + localStorage.getItem('token'),
  },
});

export default axiosInstance;
