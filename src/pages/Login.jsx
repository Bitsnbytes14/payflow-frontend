import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Zap } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = form.email && form.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-DEFAULT flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-slide-up">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center mb-4">
            <Zap size={18} className="text-white" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Welcome back
          </h1>

          <p className="text-surface-muted text-sm mt-1">
            Sign in to your PayFlow account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoFocus
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
            />

            <Button
              type="submit"
              loading={loading}
              disabled={!isValid}
              className="w-full justify-center mt-2"
            >
              Sign In
            </Button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-surface-muted mt-4">
          No account?{' '}
          <Link
            to="/register"
            className="text-brand-400 hover:text-brand-300 font-medium"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}