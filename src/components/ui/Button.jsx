import clsx from 'clsx';

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md',
  secondary: 'bg-surface-hover border border-border-color text-white hover:bg-surface-hover/70 hover:border-primary/50',
  danger: 'bg-error-bg text-error border border-error/30 hover:bg-error/20',
  ghost: 'bg-transparent text-muted hover:text-white hover:bg-surface-hover',
};

const sizes = {
  sm: 'px-3.5 py-2 text-xs min-h-[36px]',
  md: 'px-4 py-2.5 text-sm min-h-[40px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={(e) => {
        console.log("🔥 Button clicked", { type });
        if (props.onClick) props.onClick(e);
      }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 border border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
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