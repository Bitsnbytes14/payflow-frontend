import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const A      = '#0ea5e9';
const BG     = '#080e1a';
const BORDER = 'rgba(148,163,184,0.12)';
const MUTED  = '#6b7280';
const SUB    = '#94a3b8';

function InputField({ label, icon: Icon, type: baseType = 'text', placeholder, value, onChange, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const [show,    setShow]    = useState(false);
  const isPass = baseType === 'password';
  const type   = isPass ? (show ? 'text' : 'password') : baseType;

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: SUB, marginBottom: 7 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused ? A : MUTED, transition: 'color 0.2s', pointerEvents: 'none' }}>
          <Icon size={15} />
        </div>
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={onChange} autoComplete={autoComplete}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', background: 'rgba(11,20,34,0.9)',
            border: `1px solid ${focused ? A : BORDER}`,
            borderRadius: 10, padding: '12px 44px 12px 42px',
            fontSize: 14, color: '#f1f5f9', outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
            boxShadow: focused ? `0 0 0 3px rgba(14,165,233,0.12)` : 'none',
          }}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: MUTED, padding: 0, display: 'flex' }}>
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Login() {
  const navigate   = useNavigate();
  const { login }  = useAuth();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', width: '100%', background: BG,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', fontFamily: "'Inter',system-ui,sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* glows */}
      <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse,rgba(14,165,233,0.13) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: 500, height: 500, background: 'radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, animation: 'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both', position: 'relative', zIndex: 1 }}>

        {/* logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            onClick={() => navigate('/')}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, background: `linear-gradient(135deg,${A},#6366f1)`, borderRadius: 15, marginBottom: '1.25rem', boxShadow: `0 0 28px rgba(14,165,233,0.35)`, cursor: 'pointer' }}
          >
            <Zap size={24} color="#fff" fill="#fff" />
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.04em', margin: 0 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: SUB, marginTop: 8 }}>Sign in to your PayFlow account</p>
        </div>

        {/* card */}
        <div style={{
          background: 'rgba(15,25,41,0.9)', border: `1px solid ${BORDER}`,
          borderRadius: 22, padding: '2.25rem', backdropFilter: 'blur(20px)',
          boxShadow: '0 28px 72px rgba(0,0,0,0.5)',
        }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: '1.25rem', color: '#f87171', fontSize: 13 }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField label="Email"    icon={Mail} type="email"    placeholder="you@example.com" value={form.email}    onChange={set('email')}    autoComplete="email" />
            <InputField label="Password" icon={Lock} type="password" placeholder="••••••••"        value={form.password} onChange={set('password')} autoComplete="current-password" />

            <div style={{ textAlign: 'right', marginBottom: '1.75rem', marginTop: '-0.5rem' }}>
              <span style={{ fontSize: 13, color: A, cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', background: loading ? 'rgba(14,165,233,0.45)' : `linear-gradient(135deg,${A},#0284c7)`,
                border: 'none', borderRadius: 11, padding: '13px', fontSize: 15, fontWeight: 700,
                color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 22px rgba(14,165,233,0.3)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(14,165,233,0.4)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 22px rgba(14,165,233,0.3)'; }}
            >
              {loading
                ? <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                : <><span>Sign In</span><ArrowRight size={16} /></>
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: 14, color: SUB }}>
          No account?{' '}
          <span onClick={() => navigate('/register')} style={{ color: A, cursor: 'pointer', fontWeight: 700 }}>Create one</span>
        </p>
      </div>

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        html,body,#root    { margin:0;padding:0;width:100%;background:#080e1a; }
        *                  { box-sizing:border-box; }
        input::placeholder { color:#2d3748; }
        input:-webkit-autofill { -webkit-box-shadow:0 0 0 100px #0b1422 inset !important; -webkit-text-fill-color:#f1f5f9 !important; }
      `}</style>
    </div>
  );
}