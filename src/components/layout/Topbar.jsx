import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

export default function Topbar({ title }) {
  const { merchant } = useAuth();

  const initial = merchant?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header
      className={clsx(
        'h-16 border-b border-surface-border',
        'bg-surface-DEFAULT/50 backdrop-blur-sm',
        'sticky top-0 z-10 flex items-center justify-between px-6'
      )}
    >
      {/* Title */}
      <h1 className="text-lg font-semibold text-white">
        {title || 'Dashboard'}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="w-8 h-8 flex items-center justify-center rounded-lg
                     text-surface-muted hover:text-white hover:bg-surface-card
                     transition-all duration-150 border border-surface-border
                     hover:scale-105"
        >
          <Bell size={15} />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 bg-brand-500 rounded-lg flex items-center
                     justify-center text-white text-sm font-bold"
          title={merchant?.name || 'User'}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}