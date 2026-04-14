import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateWebhook } from '../api/auth';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Webhook, AlertCircle, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { merchant } = useAuth();

  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (merchant?.webhookUrl) {
      setWebhookUrl(merchant.webhookUrl);
    }
  }, [merchant]);

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
    <>
      <div className="max-w-lg w-full mx-auto space-y-6 animate-slide-up mt-4 px-4 md:px-0">

        {/* Merchant info */}
        <Card>
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-md" style={{ backgroundColor: 'var(--primary)' }}>
              {merchant?.name?.[0]?.toUpperCase() || 'U'}
            </div>

            <div>
              <h2 className="text-xl font-bold text-main tracking-tight">
                {merchant?.name || 'User'}
              </h2>
              <p className="text-sm font-medium text-muted mt-1">
                {merchant?.email || 'No email'}
              </p>
            </div>
          </div>

          <div className="space-y-4 surface p-5 rounded-2xl shadow-sm">
            {[
              ['Merchant ID', <span className="font-mono text-xs font-semibold px-2 py-1 bg-surface-hover rounded">{merchant?.id || '—'}</span>],
              ['Email', <span className="font-medium">{merchant?.email || '—'}</span>],
              ['Account', <span className="text-success font-bold flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success"></div> Active</span>],
            ].map(([label, val], i) => (
              <div key={label} className={`flex justify-between items-center text-sm ${i !== 0 ? 'pt-4 border-t' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-muted font-medium flex items-center gap-2">
                  <User size={14} className="text-muted" /> {label}
                </span>
                <span className="text-main">{val}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Webhook settings */}
        <Card>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-xl" style={{ backgroundColor: 'var(--bg-color)' }}>
              <Webhook size={18} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-main tracking-tight">
              Webhook Settings
            </h3>
          </div>

          <p className="text-sm font-medium text-muted mb-6 leading-relaxed">
            PayFlow will POST payment events to this URL with exponential backoff retry. Ensure your endpoint can handle duplicate events.
          </p>

          {success && (
            <div className="flex items-center gap-2.5 bg-success-bg border border-success text-success text-sm font-medium rounded-xl px-4 py-3 mb-6">
              <CheckCircle size={18} /> Webhook URL updated successfully
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2.5 bg-error-bg border border-error text-error text-sm font-medium rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-5">
            <Input
              label="Endpoint URL"
              placeholder="https://your-server.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />

            <div className="pt-2">
              <Button
                type="submit"
                loading={loading}
                disabled={!isValid}
                fullWidth
                size="lg"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </>
  );
}