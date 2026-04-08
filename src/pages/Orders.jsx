import { useState, useEffect } from 'react';
import { listOrders } from '../api/orders';
import { refundPayment } from '../api/payments';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatCurrency, formatDate, truncateId } from '../utils/formatters';
import { RefreshCw, Search } from 'lucide-react';

const STATUSES = ['ALL', 'CREATED', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [refunding, setRefunding] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');

    listOrders({ limit: 100 })
      .then(res => setOrders(res.orders || [])) // ✅ FIXED
      .catch(() => setError('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleRefund = async (orderId) => {
    setRefunding(orderId);
    try {
      await refundPayment(orderId);
      load();
    } catch {
      setError('Refund failed');
    } finally {
      setRefunding(null);
    }
  };

  const filtered = orders.filter(o => {
    const status = o?.status?.toUpperCase();

    const matchStatus =
      filter === 'ALL' || status === filter;

    const id = o?.id?.toLowerCase() || '';
    const email = o?.customer_email?.toLowerCase() || '';

    const matchSearch =
      !search ||
      id.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-muted" />
            <input
              placeholder="Search by ID or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface-card border border-surface-border rounded-lg
                         pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-surface-muted
                         outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all
                  ${filter === s
                    ? 'bg-brand-500/10 border-brand-500/40 text-brand-400'
                    : 'bg-surface-card border-surface-border text-surface-muted hover:text-white'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card className="p-0 overflow-hidden">
          {loading ? <Loader /> : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border">
                    {['Order ID', 'Customer', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-surface-muted px-4 py-3 first:pl-6 last:pr-6">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-surface-border">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-surface-muted text-sm py-12">
                        No orders found
                      </td>
                    </tr>
                  ) : filtered.map(order => (
                    <tr key={order.id} className="hover:bg-surface-DEFAULT/50 transition-colors">

                      <td className="px-4 py-3 pl-6 font-mono text-xs text-white">
                        #{truncateId(order.id)}
                      </td>

                      <td className="px-4 py-3 text-sm text-surface-muted">
                        {order.customer_email || '—'}
                      </td>

                      <td className="px-4 py-3 text-sm font-semibold text-white">
                        {formatCurrency(order.amount, order.currency)}
                      </td>

                      <td className="px-4 py-3 text-xs text-surface-muted">
                        {order.transactions?.[0]?.payment_method || '—'}
                      </td>

                      <td className="px-4 py-3">
                        <Badge status={order.status} />
                      </td>

                      <td className="px-4 py-3 text-xs text-surface-muted">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="px-4 py-3 pr-6">
                        {order.status?.toUpperCase() === 'SUCCESS' && (
                          <Button
                            size="sm"
                            variant="danger"
                            loading={refunding === order.id}
                            onClick={() => handleRefund(order.id)}
                          >
                            <RefreshCw size={12} /> Refund
                          </Button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

      </div>
    </Layout>
  );
}