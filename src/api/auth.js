import api from './axios';

// Helper to extract data cleanly
const handle = (promise) => promise.then(res => res.data);

// Register user
export const register = (data) =>
  handle(api.post('/auth/register', data));

// Login user
export const login = (data) =>
  handle(api.post('/auth/login', data));

// ✅ FIXED NAME
export const updateWebhook = (webhookUrl) =>
  handle(api.patch('/auth/webhook', { webhookUrl }));