import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title }) {
  const { merchant } = useAuth();
  const initial = merchant?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header className="flex items-center justify-between px-6 border-b border-border-color h-16 bg-surface sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-white">
        {title || 'Dashboard'}
      </h1>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="flex items-center justify-center rounded-lg text-muted hover:text-main bg-transparent hover:bg-surface-hover transition-colors border border-border-color w-9 h-9"
        >
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-lg text-white text-sm font-bold shadow-md cursor-pointer transition-transform hover:-translate-y-px w-9 h-9 bg-primary"
          title={merchant?.name || 'User'}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}