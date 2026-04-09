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
        'surface',
        paddings[padding],
        hover && 'surface-hover cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}