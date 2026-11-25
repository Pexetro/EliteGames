import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

// =========================================================
// ADICIONA O TOKEN AUTOMATICAMENTE
// =========================================================

api.interceptors.request.use(
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


// =========================================================
// TRATAMENTO DE ERROS DE AUTENTICAÇÃO
// =========================================================

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Só redireciona se não estiver no login
            if (!window.location.href.includes('/login')) {
                window.location.href = '/EliteGames/#/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;