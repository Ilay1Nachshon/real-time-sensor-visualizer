
import axios from 'axios';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);

export default axiosInstance;
