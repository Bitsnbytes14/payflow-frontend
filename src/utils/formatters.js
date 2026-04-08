// Format currency safely
export const formatCurrency = (amount, currency = 'INR') => {
  const value = Number(amount);
  if (isNaN(value)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format date safely
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return 'Invalid date';

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Truncate ID safely
export const truncateId = (id = '') => {
  if (!id) return 'N/A';
  return id.toString().slice(0, 8).toUpperCase();
};

// Calculate success rate safely
export const getSuccessRate = (orders = []) => {
  if (!orders.length) return '0%';

  const success = orders.filter(
    (o) => o?.status?.toUpperCase() === 'SUCCESS'
  ).length;

  return `${Math.round((success / orders.length) * 100)}%`;
};