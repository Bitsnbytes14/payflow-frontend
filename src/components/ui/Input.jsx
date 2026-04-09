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
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-muted block mb-1"
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
          'surface-input input-field',
          error && 'input-error',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
}