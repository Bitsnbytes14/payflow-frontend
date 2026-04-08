import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewPayment from './pages/NewPayment';
import Orders from './pages/Orders';
import Webhooks from './pages/Webhooks';
import Profile from './pages/Profile';

import Loader from './components/ui/Loader';

const Protected = ({ children }) => {
  const { merchant, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-DEFAULT flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return merchant ? children : <Navigate to="/login" replace />;
};

const Public = ({ children }) => {
  const { merchant, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-DEFAULT flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return merchant ? <Navigate to="/dashboard" replace /> : children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Public><Login /></Public>} />
          <Route path="/register" element={<Public><Register /></Public>} />

          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/new-payment" element={<Protected><NewPayment /></Protected>} />
          <Route path="/orders" element={<Protected><Orders /></Protected>} />
          <Route path="/webhooks" element={<Protected><Webhooks /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}