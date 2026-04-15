import clsx from 'clsx';

export default function Input({
  label,
  error,
  id,
  type = 'text',
  required = false,
  className,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-muted"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        aria-invalid={!!error}
        className={clsx(
          'bg-bg-base border border-border-color rounded-xl px-4 py-3 text-sm text-main placeholder-gray-500 transition-all duration-200 w-full',
          'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30',
          error && 'border-error ring-2 ring-error/20',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}