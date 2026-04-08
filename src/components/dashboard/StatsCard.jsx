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
    blue:   'text-blue-400 bg-blue-500/10',
    green:  'text-green-400 bg-green-500/10',
    yellow: 'text-yellow-400 bg-yellow-500/10',
    red:    'text-red-400 bg-red-500/10',
  };

  const formatValue = (val) => {
    if (typeof val !== 'number') return val;
    if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + 'M';
    if (val >= 1_000) return (val / 1_000).toFixed(1) + 'K';
    return val;
  };

  return (
    <Card hover className="transition-transform duration-200 hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        
        {/* Left */}
        <div>
          <p className="text-sm text-surface-muted">{title}</p>

          <p className="text-2xl font-bold text-white mt-1">
            {formatValue(value)}
          </p>

          {subtitle && (
            <p className="text-xs text-surface-muted mt-1">{subtitle}</p>
          )}

          {trend && (
            <p
              className={clsx(
                'text-xs mt-1 font-medium',
                trend > 0 ? 'text-green-400' : 'text-red-400'
              )}
            >
              {trend > 0 ? '+' : ''}
              {trend}%
            </p>
          )}
        </div>

        {/* Right Icon */}
        <div
          className={clsx(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            colors[color] || colors.blue
          )}
        >
          {Icon && <Icon size={18} />}
        </div>
      </div>
    </Card>
  );
}