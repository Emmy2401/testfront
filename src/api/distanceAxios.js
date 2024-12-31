import axios from 'axios';

const distanceAxios = axios.create({
  baseURL: 'http://localhost:8080/api/distance', // Base URL pour DistanceController
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default distanceAxios;