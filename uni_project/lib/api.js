import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const loginUser = async (username, password) => {
  console.log({username,password})
  const res = await API.post('users/login/', { username, password });
  console.log(res.data)
  return res.data;
};

export const registerUser = async (username, email, password) => {
  const res = await API.post('users/register/', { username, email, password });
  return res.data;
};

export const refreshToken = async (refresh) => {
  const res = await API.post('token/refresh/', { refresh });
  return res.data;
};

export const getUserById = async (user_id) => {
  const response = await API.get(`user/${user_id}`)
  console.log(response)
  return response.data
}