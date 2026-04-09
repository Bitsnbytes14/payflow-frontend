import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CreditCard, List,
  Webhook, User, LogOut, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/payments/new', icon: CreditCard,       label: 'New Payment' },
  { to: '/orders',       icon: List,             label: 'Orders' },
  { to: '/webhooks',     icon: Webhook,          label: 'Webhooks' },
  { to: '/profile',      icon: User,             label: 'Profile' },
];

export default function Sidebar() {
  const { merchant, logout } = useAuth();

  return (
    <aside
      className="flex flex-col"
      style={{
        width: '260px',
        backgroundColor: 'var(--surface-color)',
        borderRight: '1px solid var(--border-color)',
        height: '100vh',
        position: 'sticky',
        top: 0
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b flex items-center gap-3">
        <div className="flex items-center justify-center rounded-lg" style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)' }}>
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">PayFlow</span>
      </div>

      {/* Merchant info */}
      <div className="mx-4 mt-6 p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-color)' }}>
        <p className="text-xs text-muted mb-1 uppercase tracking-wider font-semibold">Account</p>
        <p className="text-sm font-medium text-main truncate">
          {merchant?.name || 'Guest'}
        </p>
        <p className="text-xs text-muted truncate mt-1">
          {merchant?.email || 'Not logged in'}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-2">
        {nav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary border border-primary text-white shadow-md'
                  : 'text-muted hover:text-white hover:bg-surface-hover'
              }`
            }
            style={({ isActive }) => (isActive ? { backgroundColor: 'var(--primary)' } : {})}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted hover:text-error transition-colors"
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--error-bg)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}