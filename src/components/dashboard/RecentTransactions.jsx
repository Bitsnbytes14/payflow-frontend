import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { formatCurrency, formatDate, truncateId } from '../../utils/formatters';

export default function RecentTransactions({ orders = [] }) {
  return (
    <Card>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-white">
          Recent Orders
        </h3>
        {orders.length > 0 && (
          <button className="text-xs text-brand-400 hover:text-brand-300 transition">
            View All
          </button>
        )}
      </div>

      {/* Empty state */}
      {orders.length === 0 ? (
        <p className="text-surface-muted text-sm text-center py-8">
          No orders yet. Create your first payment.
        </p>
      ) : (
        <div className="space-y-3">
          {orders.slice(0, 8).map((order) => {
            const id = order?.id || 'N/A';
            const date = order?.created_at
              ? formatDate(order.created_at)
              : 'Unknown date';
            const amount = order?.amount ?? 0;
            const currency = order?.currency || 'INR';
            const method = order?.payment_method || 'P';

            return (
              <div
                key={id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg
                           hover:bg-surface-DEFAULT transition-all duration-150"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 bg-surface-DEFAULT rounded-lg flex items-center
                               justify-center text-xs font-mono text-surface-muted border
                               border-surface-border uppercase"
                  >
                    {method[0]}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white font-mono">
                      #{truncateId(id)}
                    </p>
                    <p className="text-xs text-surface-muted">
                      {date}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <Badge status={order?.status || 'CREATED'} />
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(amount, currency)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}