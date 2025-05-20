import axios from 'axios';

const BASE_URL = 'http://54.237.104.114:8100/api';

export const fetchCompanies = async () => {
  const response = await axios.get(`${BASE_URL}/companies`);
  return response.data.data;
};

export const fetchExecutives = async () => {
  const response = await axios.get(`${BASE_URL}/executives`);
  return response.data.data;
};
