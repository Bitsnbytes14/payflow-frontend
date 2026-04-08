import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Zap } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    webhookUrl: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid =
    form.name &&
    form.email &&
    form.password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setError('Please fill all required fields (password ≥ 6 characters)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) =>
      setForm((p) => ({ ...p, [key]: e.target.value }))
  });

  return (
    <div className="min-h-screen bg-surface-DEFAULT flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-slide-up">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center mb-4">
            <Zap size={18} className="text-white" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Create account
          </h1>

          <p className="text-surface-muted text-sm mt-1">
            Set up your merchant profile
          </p>
        </div>

        {/* Form */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Business Name"
              placeholder="My Store"
              autoFocus
              {...field('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...field('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...field('password')}
            />

            <Input
              label="Webhook URL (optional)"
              placeholder="https://your-server.com/webhook"
              {...field('webhookUrl')}
            />

            <Button
              type="submit"
              loading={loading}
              disabled={!isValid}
              className="w-full justify-center mt-2"
            >
              Create Account
            </Button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-surface-muted mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-brand-400 hover:text-brand-300 font-medium"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}