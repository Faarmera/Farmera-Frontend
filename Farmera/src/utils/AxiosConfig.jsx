// PLEASE, DO NOT CHANGE ANYTHING HERE UNLESS YOU INFORM OPEOLUWA

import axios from 'axios';

const SetUpAxiosInterceptors = () => {
    // Request interceptor
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    // axios.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         if (error.response?.status === 401) {
    //             localStorage.clear();
    //             window.location.href = '/signin';
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 && window.location.pathname !== '/signin') {
                localStorage.clear();
                window.location.href = '/signin';
            }
            return Promise.reject(error);
        }
    );
};

export default SetUpAxiosInterceptors;