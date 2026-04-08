import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar  from './Topbar';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b1120' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}