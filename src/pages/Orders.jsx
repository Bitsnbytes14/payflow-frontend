import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { listOrders } from '../api/orders';
import { refundPayment } from '../api/payments';

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
      .catch(() => {
        const msg = 'Failed to load orders';
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleRefund = async (orderId) => {
    setRefunding(orderId);
    try {
      await refundPayment(orderId);
      toast.success('Successfully refunded order');
      load();
    } catch {
      const msg = 'Refund failed';
      setError(msg);
      toast.error(msg);
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
    <>
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
              className="bg-bg-base border border-border-color rounded-lg text-sm text-main transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full pl-10 pr-4 py-2.5"
            />
          </div>

          <div className="flex gap-1.5 md:gap-2 flex-wrap w-full">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 md:px-3.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                  filter === s
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'bg-transparent border-border-color text-muted hover:text-main hover:bg-surface-hover'
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
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-color/50">
                    {['Order ID', 'Customer', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-xs font-semibold text-muted px-4 md:px-5 py-4 uppercase tracking-wider bg-surface-hover/50 first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border-color/50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted text-sm font-medium py-16">
                        No orders found
                      </td>
                    </tr>
                  ) : filtered.map(order => (
                    <tr key={order.id} className="transition-colors hover:bg-surface-hover">

                      <td className="px-4 py-4 pl-5 font-mono text-xs font-semibold text-main">
                        #{truncateId(order.id)}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-muted">
                        {order.customer_email || '—'}
                      </td>

                      <td className="px-4 py-4 text-sm font-bold text-main">
                        {formatCurrency(order.amount, order.currency)}
                      </td>

                      <td className="px-4 py-4 text-xs font-mono font-medium text-muted">
                        {order.transactions?.[0]?.payment_method || '—'}
                      </td>

                      <td className="px-4 py-4">
                        <Badge status={order.status} />
                      </td>

                      <td className="px-4 py-4 text-xs font-medium text-muted">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="px-4 py-4 pr-5">
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
    </>
  );
}