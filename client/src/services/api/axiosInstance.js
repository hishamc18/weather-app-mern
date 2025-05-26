import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/weather',
});

export default axiosInstance;