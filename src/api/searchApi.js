import axios from 'axios';


export const fetchCompanies = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`);
  return response.data.data;
};

export const fetchExecutives = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/executives`);
  return response.data.data;
};
