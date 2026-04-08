import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateWebhook } from '../api/auth';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Webhook } from 'lucide-react';

export default function Profile() {
  const { merchant } = useAuth();

  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // ✅ Prefill webhook
  useEffect(() => {
    if (merchant?.webhookUrl) {
      setWebhookUrl(merchant.webhookUrl);
    }
  }, [merchant]);

  // ✅ Validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValid = webhookUrl && isValidUrl(webhookUrl);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setError('Enter a valid webhook URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await updateWebhook(webhookUrl);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Update failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg space-y-6 animate-slide-up">

        {/* Merchant info */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {merchant?.name?.[0]?.toUpperCase() || 'U'}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                {merchant?.name || 'User'}
              </h2>
              <p className="text-sm text-surface-muted">
                {merchant?.email || 'No email'}
              </p>
            </div>
          </div>

          <div className="space-y-3 bg-surface-DEFAULT rounded-xl p-4 border border-surface-border">
            {[
              ['Merchant ID', <span className="font-mono text-xs">{merchant?.id || '—'}</span>],
              ['Email', merchant?.email || '—'],
              ['Account', 'Active'],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-surface-muted flex items-center gap-2">
                  <User size={13} /> {label}
                </span>
                <span className="text-white">{val}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Webhook settings */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <Webhook size={16} className="text-brand-400" />
            <h3 className="text-base font-semibold text-white">
              Webhook Settings
            </h3>
          </div>

          <p className="text-sm text-surface-muted mb-4">
            PayFlow will POST payment events to this URL with exponential backoff retry.
          </p>

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg px-4 py-3 mb-4">
              Webhook URL updated successfully
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              label="Webhook URL"
              placeholder="https://your-server.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
              disabled={!isValid}
            >
              Update Webhook
            </Button>
          </form>
        </Card>

      </div>
    </Layout>
  );
}