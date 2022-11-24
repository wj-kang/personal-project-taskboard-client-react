import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

export function userAPI(): AxiosInstance {
  return axios.create({
    baseURL: `${BASE_URL}/api/user`,
  });
}

export function boardAPI(): AxiosInstance {
  return axios.create({
    baseURL: `${BASE_URL}/api/board`,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
}

export function listAPI(): AxiosInstance {
  return axios.create({
    baseURL: `${BASE_URL}/api/tasklist`,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
}

export function taskAPI(): AxiosInstance {
  return axios.create({
    baseURL: `${BASE_URL}/api/task`,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
}

export function getTokenFromStorage(): string {
  return sessionStorage.getItem('token') || '';
}
