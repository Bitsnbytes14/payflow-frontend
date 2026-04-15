import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CreditCard, List,
  Webhook, User, LogOut, Zap, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/payments/new', icon: CreditCard,       label: 'New Payment' },
  { to: '/orders',       icon: List,             label: 'Orders' },
  { to: '/webhooks',     icon: Webhook,          label: 'Webhooks' },
  { to: '/profile',      icon: User,             label: 'Profile' },
];

export default function Sidebar({ onClose }) {
  const { merchant, logout } = useAuth();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <aside
      className="flex flex-col bg-surface border-r border-border-color h-screen w-[260px]"
    >
      <div className="p-5 md:p-6 border-b border-border-color/50 flex items-center gap-3">
        <div className="flex items-center justify-center rounded-xl bg-primary w-9 h-9">
          <Zap size={18} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">PayFlow</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-auto p-2 text-muted hover:text-main rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mx-4 md:mx-5 mt-5 md:mt-6 p-4 rounded-2xl border border-border-color/50 bg-bg-base">
        <p className="text-xs text-muted mb-1 uppercase tracking-wider font-semibold">Account</p>
        <p className="text-sm font-medium text-main truncate">
          {merchant?.name || 'Guest'}
        </p>
        <p className="text-xs text-muted truncate mt-1">
          {merchant?.email || 'Not logged in'}
        </p>
      </div>

      <nav className="flex-1 px-3 md:px-4 py-5 md:py-6 space-y-1.5 md:space-y-2 overflow-y-auto mt-2">
        {nav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary border border-primary text-white shadow-sm'
                  : 'text-muted hover:text-white hover:bg-surface-hover border border-transparent'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 md:p-4 border-t border-border-color/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-3 w-full rounded-xl text-sm font-medium text-muted hover:text-error hover:bg-error-bg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}