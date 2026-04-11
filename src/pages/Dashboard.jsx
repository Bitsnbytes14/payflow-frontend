import { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { listOrders } from '../api/orders';
import StatsCard from '../components/dashboard/StatsCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import PaymentChart from '../components/dashboard/PaymentChart';
import Loader from '../components/ui/Loader';
import { formatCurrency, getSuccessRate } from '../utils/formatters';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listOrders({ limit: 50 })
      .then((res) => setOrders(res.orders || []))
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[50vh]"><Loader /></div>;

  if (error) {
    return (
      <div className="p-6">
        <p className="text-error text-center py-10 font-medium">{error}</p>
      </div>
    );
  }

  // Normalize + safe calculations
  const safeOrders = orders.map((o) => ({
    ...o,
    status: o?.status?.toUpperCase(),
    amount: Number(o?.amount) || 0,
  }));

  const totalVolume = safeOrders
    .filter((o) => o.status === 'SUCCESS')
    .reduce((s, o) => s + o.amount, 0);

  const successCount = safeOrders.filter((o) => o.status === 'SUCCESS').length;
  const failedCount = safeOrders.filter((o) => o.status === 'FAILED').length;

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Empty state */}
        {safeOrders.length === 0 && (
          <p className="text-muted text-center py-10 font-medium">
            No data yet. Create your first payment 🚀
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Volume"
            icon={TrendingUp}
            color="blue"
            value={formatCurrency(totalVolume)}
            subtitle="Successful payments"
          />

          <StatsCard
            title="Total Orders"
            icon={CreditCard}
            color="yellow"
            value={safeOrders.length}
            subtitle="All time"
          />

          <StatsCard
            title="Success Rate"
            icon={CheckCircle}
            color="green"
            value={getSuccessRate(safeOrders)}
            subtitle={`${successCount} successful`}
          />

          <StatsCard
            title="Failed Payments"
            icon={XCircle}
            color="red"
            value={failedCount}
            subtitle="Needs attention"
          />
        </div>

        {/* Chart + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PaymentChart orders={safeOrders} />
          </div>
          <div>
            <RecentTransactions orders={safeOrders} />
          </div>
        </div>

      </div>
    </>
  );
}