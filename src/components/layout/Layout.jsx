import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLocation } from 'react-router-dom';

const getTitle = (pathname) => {
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/new-payment')) return 'New Payment';
  if (pathname.startsWith('/orders')) return 'Orders';
  if (pathname.startsWith('/webhooks')) return 'Webhooks';
  if (pathname.startsWith('/profile')) return 'Profile';
  return 'PayFlow';
};

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen bg-surface-DEFAULT overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <Topbar title={getTitle(pathname)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}