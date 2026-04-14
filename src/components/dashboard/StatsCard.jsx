import Card from '../ui/Card';
import clsx from 'clsx';

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend,
}) {
  const colors = {
    blue:   { color: 'var(--primary)', bg: 'rgba(59, 130, 246, 0.1)' },
    green:  { color: 'var(--success)', bg: 'var(--success-bg)' },
    yellow: { color: 'var(--warning)', bg: 'var(--warning-bg)' },
    red:    { color: 'var(--error)', bg: 'var(--error-bg)' },
  };

  const selectedColor = colors[color] || colors.blue;

  const formatValue = (val) => {
    if (typeof val !== 'number') return val;
    if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + 'M';
    if (val >= 1_000) return (val / 1_000).toFixed(1) + 'K';
    return val;
  };

  return (
    <Card hover className="transition-transform">
      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          <p className="text-sm text-muted font-medium tracking-wide">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-main mt-2 tracking-tight">
            {formatValue(value)}
          </p>
          {subtitle && (
            <p className="text-xs text-muted mt-2 font-medium">{subtitle}</p>
          )}
          {trend && (
            <p
              className={clsx(
                'text-xs mt-2 font-semibold',
                trend > 0 ? 'text-success' : 'text-error'
              )}
            >
              {trend > 0 ? '+' : ''}
              {trend}%
            </p>
          )}
        </div>

        {/* Right Icon */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: '44px',
            height: '44px',
            backgroundColor: selectedColor.bg,
            color: selectedColor.color,
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>
    </Card>
  );
}