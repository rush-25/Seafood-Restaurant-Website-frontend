import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_BASE_URL } from "@/config/api";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BASE_URL = `${API_BASE_URL}/api/auth`;

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

export const isLoggedIn = () => !!getToken();
