import axios from 'axios';

const API = axios.create({
  baseURL: 'me-api-playground-production-cb54.up.railway.app' 
});

// attach token automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
