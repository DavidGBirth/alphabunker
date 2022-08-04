import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3005',
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'}
});

export const apiJson = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'}
});


/* export const useApi = () => ({
  signup: async (email: string)
}) */
