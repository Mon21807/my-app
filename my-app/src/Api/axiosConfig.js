// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const expectedError =
      error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
      console.error('Unexpected error occurred:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
