import clsx from 'clsx';

export default function Card({
  children,
  className,
  hover = false,
  padding = 'default',
  onClick
}) {
  const paddings = {
    none: '',
    sm: 'p-3',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-surface-card border border-surface-border rounded-xl',
        'shadow-sm',
        'animate-fade-in',
        paddings[padding],
        hover && 'hover:border-brand-500/40 hover:shadow-md transition-all duration-200 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}