import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { formatCurrency, formatDate, truncateId } from '../../utils/formatters';

export default function RecentTransactions({ orders = [] }) {
  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-main tracking-tight">
          Recent Orders
        </h3>
        {orders.length > 0 && (
          <button className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors bg-transparent border-none cursor-pointer">
            View All
          </button>
        )}
      </div>

      {/* Empty state */}
      {orders.length === 0 ? (
        <p className="text-muted text-sm text-center py-8">
          No orders yet. Create your first payment.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
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
                className="flex items-center justify-between py-3 px-4 rounded-xl transition-colors hover:bg-surface-hover"
                style={{ cursor: 'pointer' }}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center text-xs font-bold text-muted uppercase rounded-lg"
                    style={{ width: '36px', height: '36px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}
                  >
                    {method[0]}
                  </div>

                  <div>
                    <p className="text-sm tracking-tight font-semibold text-main">
                      #{truncateId(id)}
                    </p>
                    <p className="text-xs text-muted mt-1 font-medium tracking-wide">
                      {date}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold text-main">
                    {formatCurrency(amount, currency)}
                  </span>
                  <Badge status={order?.status || 'CREATED'} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}