// src/services/api.js
import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const api = axios.create({
    baseURL: 'https://genmillenauts.happyfield-fc9e256d.centralindia.azurecontainerapps.io/api',
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
