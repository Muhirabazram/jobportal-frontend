import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jobportal-api-zebb.onrender.com/api',
});

// Otomatis sisipkan token dari localStorage di setiap request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;