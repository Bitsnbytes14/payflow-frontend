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
    sm: 'p-4',
    default: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-surface border border-border-color/50 rounded-2xl shadow-sm',
        paddings[padding],
        hover && 'hover:bg-surface-hover hover:border-primary/50 hover:shadow-md transition-all cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}