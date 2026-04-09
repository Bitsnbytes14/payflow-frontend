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
    <div className="surface p-3" style={{ boxShadow: 'var(--shadow-md)' }}>
      <p className="text-xs text-muted mb-1">{label}</p>
      <p className="text-sm font-bold text-main">
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
      <h3 className="text-lg font-bold text-main mb-6 tracking-tight">
        Payment Volume
      </h3>

      {data.length === 0 ? (
        <p className="text-muted text-sm text-center py-10">
          No payment data available yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />

            <XAxis
              dataKey="date"
              tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#colorAmount)"
              activeDot={{ r: 6, fill: "var(--primary)", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}