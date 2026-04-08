import api from './axios';
import { v4 as uuidv4 } from 'uuid';

// Helper to extract response data
const handle = (promise) => promise.then(res => res.data);

// Process payment (with idempotency key)
export const processPayment = (data) =>
  handle(
    api.post('/payments/process', data, {
      headers: { 'Idempotency-Key': uuidv4() }
    })
  );

// Refund payment
export const refundPayment = (orderId) =>
  handle(api.post('/payments/refund', { orderId }));

// Get payment status
export const getPaymentStatus = (orderId) =>
  handle(api.get(`/payments/${orderId}`));