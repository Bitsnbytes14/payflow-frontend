import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title, onMenuClick }) {
  const { merchant } = useAuth();
  const initial = merchant?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header className="flex items-center justify-between px-4 md:px-6 border-b border-border-color h-16 bg-surface sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center p-2 -ml-2 text-muted hover:text-main rounded-lg hover:bg-surface-hover transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-white">
          {title || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="flex items-center justify-center rounded-lg text-muted hover:text-main bg-transparent hover:bg-surface-hover transition-colors border border-border-color w-10 h-10"
        >
          <Bell size={18} />
        </button>

        <div
          className="flex items-center justify-center rounded-lg text-white text-sm font-bold shadow-md w-10 h-10 bg-primary"
          title={merchant?.name || 'User'}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}