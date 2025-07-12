import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      const res = await API.post("token/refresh/", { refresh });

      const newAccess = res.data.access;
      localStorage.setItem("access", newAccess);

      API.defaults.headers.common['Authorization'] = 'Bearer ' + newAccess;
      originalRequest.headers['Authorization'] = 'Bearer ' + newAccess;
      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

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

export const addQuestion = async (token, title, category, tags, description) => {
  const response = await API.post('questions/create/', {title, category, tags, description},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getAllQuestions = async ({order_by="newest", count=0, category="", page="", query=""}={}) => {
  console.log(order_by)
  console.log(count)
  console.log(category)
  const response = await API.get('questions/', {
    params: {
      'order_by': order_by,
      'count': count,
      'category': category,
      'page': page,
      'query': query,
    }
  })
  console.log(response.data)
  return response.data
}

export const getCategories = async () => {
  const res = await API.get('categories/')
  return res.data
}

export const getChat = async (chatId) => {
  const res = await API.get(`chat/${chatId}`)
  return res.data
}