import clsx from 'clsx';

export default function Loader({
  text = 'Loading...',
  size = 'md',
  fullScreen = false,
  className
}) {
  const sizes = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  };
  const borderSizes = {
    sm: '2px', md: '2px', lg: '4px'
  }

  return (
    <div
      role="status"
      className={clsx(
        'flex flex-col items-center justify-center gap-4',
        fullScreen ? 'h-screen' : 'py-10',
        className
      )}
    >
      <div
        className="animate-spin rounded-full inline-block"
        style={{
           width: sizes[size],
           height: sizes[size],
           border: `${borderSizes[size]} solid rgba(59, 130, 246, 0.3)`,
           borderTopColor: '#3b82f6'
        }}
      />
      {text && (
        <p className="text-sm text-muted">{text}</p>
      )}
    </div>
  );
}