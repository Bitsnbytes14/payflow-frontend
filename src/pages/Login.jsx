import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

function InputField({ label, icon: Icon, type: baseType = 'text', placeholder, value, onChange, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const [show,    setShow]    = useState(false);
  const isPass = baseType === 'password';
  const type   = isPass ? (show ? 'text' : 'password') : baseType;

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <div className={`relative bg-white/80 border border-slate-300 rounded-xl transition-all duration-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/30 ${focused ? 'scale-[1.01]' : ''}`}>
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none ${focused ? 'text-blue-500' : 'text-slate-400'}`} style={{ transform: 'translateY(-50%)' }}>
          <Icon size={16} />
        </div>
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={onChange} autoComplete={autoComplete}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`bg-transparent border-none rounded-xl text-sm text-slate-800 placeholder-slate-400 w-full pl-10 ${isPass ? 'pr-10' : 'pr-4'} py-3 focus:outline-none`}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 bg-transparent border-none cursor-pointer p-0 flex"
            style={{ transform: 'translateY(-50%)' }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Login() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Invalid email or password.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Background Orbs */}
      <div className="absolute pointer-events-none" style={{ top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 60%)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '-10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)' }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in px-4 py-6 md:p-6">
        <div className="text-center mb-10">
          <div onClick={() => navigate('/')} className="inline-flex items-center justify-center rounded-2xl cursor-pointer shadow-glow mx-auto mb-6 transition-transform hover:scale-105" style={{ width: '56px', height: '56px', backgroundColor: 'var(--primary)' }}>
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Welcome back</h1>
          <p className="text-slate-600 font-medium">Sign in to your PayFlow account</p>
        </div>

        <div className="bg-white/80 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl">
          {error && (
            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg text-sm bg-error-bg text-error border border-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField label="Email" icon={Mail} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} autoComplete="email" />
            <InputField label="Password" icon={Lock} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} autoComplete="current-password" />

            <div className="text-right mb-6 mt-1">
              <span className="text-sm text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">Forgot password?</span>
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg">
              Sign In {!loading && <ArrowRight size={18} className="ml-1" />}
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-slate-600">
          No account?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">Create one</span>
        </p>
      </div>
    </div>
  );
}