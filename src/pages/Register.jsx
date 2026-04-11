import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Zap, User, Mail, Lock, Link2, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const strLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strColors = ['', 'var(--error)', 'var(--warning)', '#facc15', 'var(--success)'];

function strength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function InputField({ label, icon: Icon, type: baseType = 'text', placeholder, value, onChange, autoComplete, hint }) {
  const [focused, setFocused] = useState(false);
  const [show,    setShow]    = useState(false);
  const isPass = baseType === 'password';
  const type   = isPass ? (show ? 'text' : 'password') : baseType;

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-muted mb-2">{label}</label>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none ${focused ? 'text-primary' : 'text-muted'}`} style={{ transform: 'translateY(-50%)' }}>
          <Icon size={16} />
        </div>
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={onChange} autoComplete={autoComplete}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`bg-bg-base border border-border-color rounded-lg text-sm text-main transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full pl-10 ${isPass ? 'pr-10' : 'pr-4'} py-3`}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-main bg-transparent border-none cursor-pointer p-0 flex"
            style={{ transform: 'translateY(-50%)' }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-muted mt-2">{hint}</p>}
    </div>
  );
}

export default function Register() {
  const navigate     = useNavigate();
  const { register } = useAuth();

  const [form, setForm]       = useState({ name: '', email: '', password: '', webhookUrl: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const str = strength(form.password);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name.trim())        { setError('Business name is required.');         return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register({
        name:       form.name,
        email:      form.email,
        password:   form.password,
        webhookUrl: form.webhookUrl || undefined,
      });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Registration failed.';
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
      <div className="absolute pointer-events-none" style={{ bottom: '-10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)' }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in p-6 my-8">
        <div className="text-center mb-8">
          <div onClick={() => navigate('/')} className="inline-flex items-center justify-center rounded-2xl cursor-pointer shadow-glow mx-auto mb-6 transition-transform hover:scale-105" style={{ width: '56px', height: '56px', backgroundColor: 'var(--primary)' }}>
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-main tracking-tight mb-2">Create account</h1>
          <p className="text-muted font-medium">Set up your merchant profile</p>
        </div>

        <div className="bg-surface border border-border-color rounded-xl p-8 shadow-xl">
          {error && (
            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg text-sm bg-error-bg text-error border border-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField label="Business Name" icon={User} placeholder="Acme Corp" value={form.name} onChange={set('name')} autoComplete="organization" />
            <InputField label="Email" icon={Mail} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} autoComplete="email" />
            <InputField label="Password" icon={Lock} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} autoComplete="new-password" />

            {form.password.length > 0 && (
              <div className="mb-4 -mt-2">
                <div className="flex gap-1.5 mb-1.5">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="flex-1 h-1 rounded-full transition-colors duration-300" style={{ backgroundColor: n <= str ? strColors[str] : 'var(--surface-color)' }} />
                  ))}
                </div>
                <span className="text-xs font-bold" style={{ color: strColors[str] }}>{strLabels[str]}</span>
              </div>
            )}

            <InputField label="Webhook URL (optional)" icon={Link2} placeholder="https://your-server.com/webhooks" value={form.webhookUrl} onChange={set('webhookUrl')} hint="PayFlow will POST payment events to this URL" />

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
              {['No setup fees during beta', 'Full API access from day one', 'Cancel or delete anytime'].map((t, i, a) => (
                <div key={t} className={`flex items-center gap-2 text-sm text-muted ${i < a.length - 1 ? 'mb-2' : ''}`}>
                  <CheckCircle size={14} className="text-primary flex-shrink-0" /> {t}
                </div>
              ))}
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg">
              Create Account {!loading && <ArrowRight size={18} className="ml-1" />}
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-muted">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-primary font-semibold cursor-pointer hover:text-primary-hover transition-colors">Sign in</span>
        </p>
      </div>
    </div>
  );
}