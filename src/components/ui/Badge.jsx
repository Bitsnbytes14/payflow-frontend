import clsx from 'clsx';

const styles = {
  CREATED:    'badge-warning',
  PROCESSING: 'badge-blue',
  SUCCESS:    'badge-success',
  FAILED:     'badge-error',
  REFUNDED:   'badge-neutral',
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
        'badge',
        styles[normalized] || 'badge-neutral'
      )}
    >
      {children || formatLabel(normalized)}
    </span>
  );
}