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
          className="text-sm font-medium text-slate-300"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        aria-invalid={!!error}
        className={clsx(
          'w-full bg-surface-card border rounded-lg px-4 py-2.5 text-white',
          'placeholder:text-surface-muted text-sm outline-none',
          'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
            : 'border-surface-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}