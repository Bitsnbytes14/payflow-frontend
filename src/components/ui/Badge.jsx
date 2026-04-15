import clsx from 'clsx';

const styles = {
  CREATED:    'bg-warning-bg text-warning border-warning/20',
  PROCESSING: 'bg-primary/10 text-primary border-primary/20',
  SUCCESS:    'bg-success-bg text-success border-success/20',
  FAILED:     'bg-error-bg text-error border-error/20',
  REFUNDED:   'bg-surface-hover text-muted border-border-color',
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
        'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
        styles[normalized] || 'bg-surface-hover text-muted border-border-color'
      )}
    >
      {children || formatLabel(normalized)}
    </span>
  );
}