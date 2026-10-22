const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export function getToken() { return localStorage.getItem('fleetflow_token'); }
export function setSession(token, user) { localStorage.setItem('fleetflow_token', token); localStorage.setItem('fleetflow_user', JSON.stringify(user)); }
export function clearSession() { localStorage.removeItem('fleetflow_token'); localStorage.removeItem('fleetflow_user'); }
export function getUser() { try { return JSON.parse(localStorage.getItem('fleetflow_user') || 'null'); } catch { return null; } }
export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken(); if (token) headers.Authorization = `Bearer ${token}`;
  let response;
  try { response = await fetch(`${API_URL}${path}`, { ...options, headers }); }
  catch { throw new Error('Unable to reach the server. Check that the API is running and try again.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) { if (response.status === 401 && path !== '/auth/login' && path !== '/auth/register') { clearSession(); window.dispatchEvent(new Event('fleetflow:logout')); } throw new Error(data.message || 'Request failed. Please try again.'); }
  return data;
}
