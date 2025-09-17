import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true,
});

// Add interceptors ONCE
axiosInstance.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

const useAxiosSecure = () => axiosInstance;

export default useAxiosSecure;