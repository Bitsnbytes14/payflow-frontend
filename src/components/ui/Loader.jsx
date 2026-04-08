import clsx from 'clsx';

export default function Loader({
  text = 'Loading...',
  size = 'md',
  fullScreen = false,
  className
}) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      role="status"
      className={clsx(
        'flex flex-col items-center justify-center gap-3',
        fullScreen ? 'h-screen' : 'py-20',
        className
      )}
    >
      <div
        className={clsx(
          'border-brand-500/30 border-t-brand-500 rounded-full animate-spin',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-sm text-surface-muted">{text}</p>
      )}
    </div>
  );
}