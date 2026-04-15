import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { listOrders } from '../api/orders';
import { getWebhookLogs, retryWebhook } from '../api/webhooks';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatDate, truncateId } from '../utils/formatters';
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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
        const msg = 'Failed to load webhook logs';
        setError(msg);
        toast.error(msg);
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
      toast.success('Webhook retry queued');
    } catch {
      const msg = 'Retry failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setRetrying(null);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in">

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-bg text-error border border-error text-sm font-medium">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <Card className="p-0 overflow-hidden">
          {loading ? <Loader /> : (
            <div className="overflow-x-auto">

              <div className="px-5 md:px-6 py-5 border-b border-border-color/50">
                <h3 className="text-lg font-bold text-main tracking-tight">
                  Webhook Delivery Logs
                </h3>
                <p className="text-sm font-medium text-muted mt-1">
                  {logs.length} total events recorded
                </p>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-color/50">
                    {['Order', 'Event', 'Attempts', 'Status', 'Last Attempt', 'Actions'].map(h => (
                      <th key={h} className="text-xs font-semibold text-muted px-4 md:px-5 py-4 uppercase tracking-wider bg-surface-hover/50 first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border-color/50">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted text-sm font-medium py-16">
                        No webhook events yet
                      </td>
                    </tr>
                  ) : logs.map(log => {
                    const delivered = !!log?.delivered;

                    return (
                      <tr key={log.id} className="transition-colors hover:bg-surface-hover">

                        <td className="px-4 py-4 pl-5 font-mono text-xs font-semibold text-main">
                          #{truncateId(log?.order_id)}
                        </td>

                        <td className="px-4 py-4">
                          <span className="text-[11px] font-bold text-primary px-2 py-1 rounded-md uppercase tracking-wider border bg-bg-base border-border-color">
                            {log?.event_type}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-muted">
                          <span className="text-main font-semibold">{log?.attempts || 0}</span> / 5
                        </td>

                        <td className="px-4 py-4">
                          {delivered ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                              <CheckCircle size={14} /> Delivered
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-warning">
                              <XCircle size={14} /> Pending
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4 text-xs font-medium text-muted">
                          {log?.last_attempted_at
                            ? formatDate(log.last_attempted_at)
                            : '—'}
                        </td>

                        <td className="px-4 py-4 pr-5">
                          {!delivered && (
                            <Button
                              size="sm"
                              variant="secondary"
                              loading={retrying === log.id}
                              disabled={retrying === log.id}
                              onClick={() => handleRetry(log.id)}
                            >
                              <RefreshCw size={14} className="mr-1.5" /> Retry
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
    </>
  );
}