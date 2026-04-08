import api from './axios';

// Helper to extract response data
const handle = (promise) => promise.then(res => res.data);

// Get webhook logs for an order
export const getWebhookLogs = (orderId) =>
  handle(api.get(`/webhooks/logs/${orderId}`));

// Retry a failed webhook
export const retryWebhook = (webhookLogId) =>
  handle(api.post(`/webhooks/retry/${webhookLogId}`));