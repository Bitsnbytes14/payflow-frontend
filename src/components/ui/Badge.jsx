import clsx from 'clsx';

const styles = {
  CREATED:    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  PROCESSING: 'bg-blue-500/10  text-blue-400  border-blue-500/20',
  SUCCESS:    'bg-green-500/10 text-green-400 border-green-500/20',
  FAILED:     'bg-red-500/10   text-red-400   border-red-500/20',
  REFUNDED:   'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const formatLabel = (status) =>
  status
    ?.toLowerCase()
    .replace('_', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function Badge({ status, children }) {
  const normalized = status?.toUpperCase();

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        styles[normalized] || 'bg-surface-card text-surface-muted border-surface-border'
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {children || formatLabel(normalized)}
    </span>
  );
}