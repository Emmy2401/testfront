import axios from 'axios';

const productsAxios = axios.create({
  baseURL: 'http://localhost:8080/products', // Base URL pour ProductsController
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour inclure le token JWT
productsAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default productsAxios;
