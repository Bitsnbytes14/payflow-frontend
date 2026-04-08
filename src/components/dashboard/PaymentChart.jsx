import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import Card from '../ui/Card';

// Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value || 0;

  return (
    <div className="bg-surface-card border border-surface-border rounded-lg px-3 py-2 shadow-md">
      <p className="text-xs text-surface-muted">{label}</p>
      <p className="text-sm font-semibold text-white">
        ₹{value.toLocaleString()}
      </p>
    </div>
  );
};

export default function PaymentChart({ orders = [] }) {
  // Process data safely
  const data = orders
    .filter(o => o?.created_at && o?.amount)
    .reduce((acc, order) => {
      const dateObj = new Date(order.created_at);
      if (isNaN(dateObj)) return acc;

      const date = dateObj.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric'
      });

      const amount = Number(order.amount) || 0;

      const existing = acc.find(d => d.date === date);

      if (existing) {
        existing.amount += amount;
        existing.count += 1;
      } else {
        acc.push({ date, amount, count: 1, timestamp: dateObj });
      }

      return acc;
    }, [])
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-7);

  return (
    <Card>
      <h3 className="text-base font-semibold text-white mb-4">
        Payment Volume
      </h3>

      {data.length === 0 ? (
        <p className="text-surface-muted text-sm text-center py-10">
          No payment data available yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis
              dataKey="date"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#0ea5e9"
              strokeWidth={2}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}