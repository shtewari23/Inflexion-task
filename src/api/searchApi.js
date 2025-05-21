import axios from 'axios';


export const fetchCompanies = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/companies`);
  return response.data.data;
};

export const fetchExecutives = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/executives`);
  return response.data.data;
};
