import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import { createOrder } from '../api/orders';
import { processPayment, refundPayment } from '../api/payments';

export default function NewPayment() {
  const [form, setForm] = useState({
    amount: '',
    currency: 'INR',
    customerEmail: '',
    paymentMethod: 'CARD'
  });

  const [order, setOrder] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleProcess = async (e) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      setError('Enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderRes = await createOrder({
        amount: Number(form.amount),
        currency: form.currency,
        customerEmail: form.customerEmail
      });

      const newOrder = orderRes;
      if (!newOrder?.id) throw new Error('Invalid order response');

      setOrder(newOrder);

      const payRes = await processPayment({
        orderId: newOrder.id,
        paymentMethod: form.paymentMethod
      });

      if (!payRes) throw new Error('Payment failed');

      setResult(payRes);
      setStep(2);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Payment failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!order) return;

    setLoading(true);
    try {
      const res = await refundPayment(order.id);
      setResult(res);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Refund failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-6">

        <Card>
          <h2 className="text-white text-lg font-semibold mb-4">
            Create Payment
          </h2>

          {error && (
            <div className="text-red-400 text-sm mb-3">{error}</div>
          )}

          <form onSubmit={handleProcess} className="space-y-4">
            <Input
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
            />

            <Input
              label="Customer Email"
              value={form.customerEmail}
              onChange={(e) => handleChange('customerEmail', e.target.value)}
            />

            <Button type="submit" loading={loading} className="w-full">
              Pay Now
            </Button>
          </form>
        </Card>

        {result && (
          <Card>
            <h3 className="text-white font-semibold mb-2">
              Payment Result
            </h3>
            <pre className="text-sm text-green-400">
              {JSON.stringify(result, null, 2)}
            </pre>

            <Button
              variant="danger"
              onClick={handleRefund}
              loading={loading}
              className="mt-4"
            >
              Refund Payment
            </Button>
          </Card>
        )}

      </div>
    </Layout>
  );
}