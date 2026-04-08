import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Layout    from './components/layout/Layout';
import Landing   from './pages/Landing';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewPayment from './pages/NewPayment';
import Orders    from './pages/Orders';
import Webhooks  from './pages/Webhooks';
import Profile   from './pages/Profile';

/* Redirects logged-in users away from auth pages */
function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

/* Redirects guests away from protected pages */
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public / auth routes — NO sidebar layout ── */}
        <Route path="/"         element={<Landing />} />
        <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* ── Protected routes — WITH sidebar layout ── */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/payments/new" element={<NewPayment />} />
          <Route path="/orders"      element={<Orders />} />
          <Route path="/webhooks"    element={<Webhooks />} />
          <Route path="/profile"     element={<Profile />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}