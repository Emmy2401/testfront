import axios from 'axios';

// Configure Axios avec l'URL de base de votre backend
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/auth', // Base URL pour AuthController
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
