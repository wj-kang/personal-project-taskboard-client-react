import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

export function userAPI() {
  return axios.create({
    baseURL: `${BASE_URL}/api/user`,
  });
}

export function boardAPI() {
  return axios.create({
    baseURL: `${BASE_URL}/api/board`,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
}

export function listAPI() {
  return axios.create({
    baseURL: `${BASE_URL}/api/tasklist`,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
}

export function taskAPI() {
  return axios.create({
    baseURL: `${BASE_URL}/api/task`,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
}

function getTokenFromStorage() {
  return sessionStorage.getItem('token') || '';
}
