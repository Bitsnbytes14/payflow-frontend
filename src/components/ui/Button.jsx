import clsx from 'clsx';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-lg hover:-translate-y-[1px]',
  secondary: 'bg-surface text-main border border-border-color hover:bg-surface-hover hover:border-primary/50',
  danger: 'bg-error-bg text-error border border-error/20 hover:bg-error/20',
  ghost: 'bg-transparent text-muted hover:text-main hover:bg-surface',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  type = 'button', // ✅ allow override
  ...props
}) {
  return (
    <button
      type={type} // ✅ critical fix
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all border border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {children}
    </button>
  );
}