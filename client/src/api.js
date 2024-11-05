// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_TUNNEL_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;