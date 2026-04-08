import api from './axios';

// Helper to extract response data
const handle = (promise) => promise.then(res => res.data);

// Create a new order
export const createOrder = (data) =>
  handle(api.post('/orders/create', data));

// Get single order by ID
export const getOrder = (orderId) =>
  handle(api.get(`/orders/${orderId}`));

// Get all orders (with optional query params)
export const listOrders = (params = {}) =>
  handle(api.get('/orders', { params }));