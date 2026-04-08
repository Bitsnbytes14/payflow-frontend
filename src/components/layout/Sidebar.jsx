import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CreditCard, List,
  Webhook, User, LogOut, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const nav = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/new-payment',  icon: CreditCard,       label: 'New Payment' },
  { to: '/orders',       icon: List,             label: 'Orders' },
  { to: '/webhooks',     icon: Webhook,          label: 'Webhooks' },
  { to: '/profile',      icon: User,             label: 'Profile' },
];

export default function Sidebar() {
  const { merchant, logout } = useAuth();

  return (
    <aside className="w-64 bg-surface-card border-r border-surface-border flex flex-col h-screen sticky top-0">
      
      {/* Logo */}
      <div className="p-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">PayFlow</span>
        </div>
      </div>

      {/* Merchant info */}
      <div className="px-4 py-3 mx-3 mt-4 bg-surface-DEFAULT rounded-xl border border-surface-border">
        <p className="text-xs text-surface-muted">Merchant</p>
        <p className="text-sm font-medium text-white truncate mt-0.5">
          {merchant?.name || 'Guest'}
        </p>
        <p className="text-xs text-surface-muted truncate">
          {merchant?.email || 'Not logged in'}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-surface-muted hover:text-white hover:bg-surface-DEFAULT'
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-surface-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-surface-muted hover:text-red-400 hover:bg-red-500/5 transition-all duration-150"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}