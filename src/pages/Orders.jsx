import { useState, useEffect } from 'react';
import { listOrders } from '../api/orders';
import { refundPayment } from '../api/payments';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatCurrency, formatDate, truncateId } from '../utils/formatters';
import { RefreshCw, Search, AlertCircle } from 'lucide-react';

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
      .then(res => setOrders(res.orders || []))
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
      <div className="space-y-6 animate-fade-in">

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-bg text-error border border-error text-sm font-medium">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 w-full max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              placeholder="Search by ID or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field surface-input w-full pl-10 pr-4 py-2.5"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                  filter === s
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-transparent border-surface text-muted hover:text-main hover:bg-surface-hover'
                }`}
                style={filter === s ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : { borderColor: 'var(--border-color)'}}
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
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                    {['Order ID', 'Customer', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-xs font-semibold text-muted px-5 py-4 uppercase tracking-wider bg-surface-hover/50 first:pl-6 last:pr-6">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted text-sm font-medium py-16">
                        No orders found
                      </td>
                    </tr>
                  ) : filtered.map(order => (
                    <tr key={order.id} className="transition-colors hover:bg-surface-hover">

                      <td className="px-5 py-4 pl-6 font-mono text-xs font-semibold text-main">
                        #{truncateId(order.id)}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-muted">
                        {order.customer_email || '—'}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-main">
                        {formatCurrency(order.amount, order.currency)}
                      </td>

                      <td className="px-5 py-4 text-xs font-mono font-medium text-muted bg-surface-hover/20 rounded">
                        {order.transactions?.[0]?.payment_method || '—'}
                      </td>

                      <td className="px-5 py-4">
                        <Badge status={order.status} />
                      </td>

                      <td className="px-5 py-4 text-xs font-medium text-muted">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="px-5 py-4 pr-6">
                        {order.status?.toUpperCase() === 'SUCCESS' && (
                          <Button
                            size="sm"
                            variant="danger"
                            loading={refunding === order.id}
                            onClick={() => handleRefund(order.id)}
                          >
                            <RefreshCw size={14} className="mr-1.5" /> Refund
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