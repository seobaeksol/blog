import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

export const check = () => client.get('/api/auth/check');

export const logoout = () => client.post('/api/auth/logout');
