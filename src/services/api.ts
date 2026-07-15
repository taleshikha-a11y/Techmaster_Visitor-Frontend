import axios from 'axios';

const API_URL = 'https://techmaster-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mergeData = (fallback: any, current: any) => {
  if (!current) return fallback;
  
  // If backend returns an error string (like "404 Not Found" or HTML) instead of JSON
  if (typeof current !== 'object') return fallback; 
  
  if (Array.isArray(current)) return current.length > 0 ? current : fallback;
  if (Object.keys(current).length === 0) return fallback;
  
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
