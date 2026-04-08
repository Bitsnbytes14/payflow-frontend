import { useState, useEffect } from 'react';
import { listOrders } from '../api/orders';
import { getWebhookLogs, retryWebhook } from '../api/webhooks';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatDate, truncateId } from '../utils/formatters';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function Webhooks() {
  const [orders, setOrders] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(null);
  const [error, setError] = useState('');

  const fetchLogs = async (orders) => {
    const results = await Promise.allSettled(
      orders.map(o => getWebhookLogs(o.id))
    );

    return results.flatMap(r =>
      r.status === 'fulfilled' ? r.value : []
    );
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await listOrders({ limit: 50 });
        const ordersData = res.orders || [];

        setOrders(ordersData);

        const logsData = await fetchLogs(ordersData);
        setLogs(logsData);

      } catch {
        setError('Failed to load webhook logs');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleRetry = async (logId) => {
    setRetrying(logId);

    try {
      await retryWebhook(logId);

      const logsData = await fetchLogs(orders);
      setLogs(logsData);

    } catch {
      setError('Retry failed');
    } finally {
      setRetrying(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">

        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        <Card className="p-0 overflow-hidden">
          {loading ? <Loader /> : (
            <div className="overflow-x-auto">

              {/* Header */}
              <div className="px-6 py-4 border-b border-surface-border">
                <h3 className="text-base font-semibold text-white">
                  Webhook Delivery Logs
                </h3>
                <p className="text-xs text-surface-muted mt-0.5">
                  {logs.length} total events
                </p>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border">
                    {['Order', 'Event', 'Attempts', 'Status', 'Last Attempt', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-surface-muted px-4 py-3 first:pl-6 last:pr-6">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-surface-border">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-surface-muted text-sm py-12">
                        No webhook events yet
                      </td>
                    </tr>
                  ) : logs.map(log => {
                    const delivered = !!log?.delivered;

                    return (
                      <tr key={log.id} className="hover:bg-surface-DEFAULT/50 transition-colors">

                        <td className="px-4 py-3 pl-6 font-mono text-xs text-white">
                          #{truncateId(log?.order_id)}
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 px-2 py-1 rounded-md border border-brand-500/20">
                            {log?.event_type}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-sm text-surface-muted">
                          {log?.attempts || 0}/5
                        </td>

                        <td className="px-4 py-3">
                          {delivered ? (
                            <span className="flex items-center gap-1 text-xs text-green-400">
                              <CheckCircle size={12} /> Delivered
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-red-400">
                              <XCircle size={12} /> Pending
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-xs text-surface-muted">
                          {log?.last_attempted_at
                            ? formatDate(log.last_attempted_at)
                            : '—'}
                        </td>

                        <td className="px-4 py-3 pr-6">
                          {!delivered && (
                            <Button
                              size="sm"
                              variant="secondary"
                              loading={retrying === log.id}
                              disabled={retrying === log.id}
                              onClick={() => handleRetry(log.id)}
                            >
                              <RefreshCw size={12} /> Retry
                            </Button>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          )}
        </Card>

      </div>
    </Layout>
  );
}