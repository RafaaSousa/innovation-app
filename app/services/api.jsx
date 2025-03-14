// app/services/api.jsx
import axios from 'axios';

export const fetchProductsApi = async (search = '') => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject('Token not found');
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(
    'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar',
    {
      nome_produto: search,
      codigo_produto: '',
    },
    config
  );
};