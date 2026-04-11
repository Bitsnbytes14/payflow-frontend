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
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-surface border border-border-color rounded-xl shadow-md',
        paddings[padding],
        hover && 'hover:bg-surface-hover hover:border-primary/50 hover:-translate-y-0.5 transition-all cursor-pointer shadow-lg',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}