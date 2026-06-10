import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL = 'http://localhost:8000/api/auth';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

export const isLoggedIn = () => !!getToken();