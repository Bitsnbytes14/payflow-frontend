import clsx from 'clsx';

const variants = {
  primary: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg hover:scale-[1.02] backdrop-blur-md',
  secondary: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-md',
  danger: 'bg-error-bg text-error border border-error/20 hover:bg-error/20 backdrop-blur-md',
  ghost: 'bg-transparent text-muted hover:text-white hover:bg-white/10 backdrop-blur-md',
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
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type} // ✅ important: allows submit to work
      onClick={(e) => {
        console.log("🔥 Button clicked", { type }); // 🧪 TEST LOG
        if (props.onClick) props.onClick(e);
      }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 border border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed',
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