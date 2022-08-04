import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3005',
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
});

export const axiosPOST = async (url: string, formData: any) => {
  const { data } = await api.post<RequestTypes>(url, formData);
  return data.message;
};

export const apiJson = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
});

/* export const useApi = () => ({
  signup: async (email: string)
}) */
