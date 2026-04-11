import { useState } from 'react';
import toast from 'react-hot-toast';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import { createOrder } from '../api/orders';
import { processPayment, refundPayment } from '../api/payments';
import { AlertCircle } from 'lucide-react';

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
      const msg = err?.response?.data?.message || err?.message || 'Payment failed';
      setError(msg);
      toast.error(msg);
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
      const msg = err?.response?.data?.message || err?.message || 'Refund failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in mt-6">

        <Card>
          <h2 className="text-main text-xl font-bold tracking-tight mb-6">
            Create Payment
          </h2>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-bg text-error border border-error mb-6 text-sm font-medium">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleProcess} className="space-y-5">
            <Input
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
            />

            <Input
              label="Customer Email"
              type="email"
              value={form.customerEmail}
              onChange={(e) => handleChange('customerEmail', e.target.value)}
            />

            <div className="pt-2">
              <Button type="submit" loading={loading} fullWidth size="lg">
                Pay Now
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card>
            <h3 className="text-main text-lg font-bold tracking-tight mb-4">
              Payment Result
            </h3>
            <pre className="text-sm font-mono text-success bg-success-bg border border-success p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>

            <Button
              variant="danger"
              onClick={handleRefund}
              loading={loading}
              className="mt-6"
              size="lg"
            >
              Refund Payment
            </Button>
          </Card>
        )}

      </div>
    </>
  );
}