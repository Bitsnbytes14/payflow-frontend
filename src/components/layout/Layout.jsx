import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar  from './Topbar';

export default function Layout() {
  return (
    <div className="flex h-full w-full" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ overflow: 'hidden' }}>
        <Topbar />
        <main className="flex-1 p-6" style={{ overflowY: 'auto' }}>
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}