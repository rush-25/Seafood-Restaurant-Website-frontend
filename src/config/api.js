const envUrl = import.meta.env.VITE_API_BASE_URL || 'https://seafood-restaurant-website-backtend.onrender.com';
export const API_BASE_URL = envUrl.replace(/\/+$/, '');
