import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title }) {
  const { merchant } = useAuth();
  const initial = merchant?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header
      className="flex items-center justify-between px-6 border-b"
      style={{
        height: '64px',
        backgroundColor: 'var(--surface-color)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <h1 className="text-lg font-semibold text-white">
        {title || 'Dashboard'}
      </h1>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="flex items-center justify-center rounded-lg text-muted hover:text-main transition-colors border"
          style={{ width: '36px', height: '36px', backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-lg text-white text-sm font-bold shadow-md cursor-pointer transition-transform hover:-translate-y-px"
          style={{ width: '36px', height: '36px', backgroundColor: 'var(--primary)' }}
          title={merchant?.name || 'User'}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}