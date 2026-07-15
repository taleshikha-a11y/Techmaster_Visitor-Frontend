import axios from 'axios';

const API_URL = 'https://techmaster-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mergeData = (fallback, current) => {
  if (!current) return fallback;
  if (typeof current !== 'object') return current;
  if (Array.isArray(current)) return current.length > 0 ? current : fallback;
  
  const merged = { ...fallback };
  for (const key in current) {
    if (current[key] !== null && current[key] !== undefined) {
      if (typeof current[key] === 'object' && !Array.isArray(current[key])) {
        merged[key] = mergeData(fallback[key] || {}, current[key]);
      } else {
        merged[key] = current[key];
      }
    }
  }
  return merged;
};

export default api;
