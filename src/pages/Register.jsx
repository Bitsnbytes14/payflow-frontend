import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock, Link2, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const A      = '#0ea5e9';
const BG     = '#080e1a';
const BORDER = 'rgba(148,163,184,0.12)';
const MUTED  = '#6b7280';
const SUB    = '#94a3b8';

const strLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strColors = ['', '#f87171', '#fb923c', '#facc15', '#34d399'];
function strength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function InputField({ label, icon: Icon, type: baseType = 'text', placeholder, value, onChange, autoComplete, hint }) {
  const [focused, setFocused] = useState(false);
  const [show,    setShow]    = useState(false);
  const isPass = baseType === 'password';
  const type   = isPass ? (show ? 'text' : 'password') : baseType;

  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: SUB, marginBottom: 6 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: focused ? A : MUTED, transition: 'color 0.2s', pointerEvents: 'none' }}>
          <Icon size={15} />
        </div>
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={onChange} autoComplete={autoComplete}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', background: 'rgba(11,20,34,0.9)',
            border: `1px solid ${focused ? A : BORDER}`,
            borderRadius: 10, padding: '11px 40px 11px 40px',
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
      {hint && <p style={{ fontSize: 12, color: MUTED, marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

export default function Register() {
  const navigate       = useNavigate();
  const { register }   = useAuth();
  const [form, setForm]     = useState({ businessName: '', email: '', password: '', webhookUrl: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const str = strength(form.password);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.businessName.trim()) { setError('Business name is required.'); return; }
    if (form.password.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.businessName, form.webhookUrl);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
      <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 500, height: 500, background: 'radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, animation: 'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both', position: 'relative', zIndex: 1 }}>

        {/* logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            onClick={() => navigate('/')}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, background: `linear-gradient(135deg,${A},#6366f1)`, borderRadius: 15, marginBottom: '1.25rem', boxShadow: `0 0 28px rgba(14,165,233,0.35)`, cursor: 'pointer' }}
          >
            <Zap size={24} color="#fff" fill="#fff" />
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.04em', margin: 0 }}>Create account</h1>
          <p style={{ fontSize: 14, color: SUB, marginTop: 8 }}>Set up your merchant profile</p>
        </div>

        {/* card */}
        <div style={{
          background: 'rgba(15,25,41,0.9)', border: `1px solid ${BORDER}`,
          borderRadius: 22, padding: '2.25rem', backdropFilter: 'blur(20px)',
          boxShadow: '0 28px 72px rgba(0,0,0,0.5)',
        }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: '1.1rem', color: '#f87171', fontSize: 13 }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField label="Business Name"          icon={User}  placeholder="My Store"                        value={form.businessName} onChange={set('businessName')} autoComplete="organization" />
            <InputField label="Email"                  icon={Mail}  type="email" placeholder="you@example.com"    value={form.email}        onChange={set('email')}        autoComplete="email" />
            <InputField label="Password"               icon={Lock}  type="password" placeholder="••••••••"         value={form.password}     onChange={set('password')}     autoComplete="new-password" />

            {/* password strength */}
            {form.password.length > 0 && (
              <div style={{ marginBottom: '1.1rem', marginTop: '-0.4rem' }}>
                <div style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} style={{ flex: 1, height: 3, borderRadius: 99, background: n <= str ? strColors[str] : 'rgba(148,163,184,0.12)', transition: 'background 0.3s' }} />
                  ))}
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: strColors[str] }}>{strLabels[str]}</span>
              </div>
            )}

            <InputField
              label="Webhook URL (optional)" icon={Link2}
              placeholder="https://your-server.com/webhooks"
              value={form.webhookUrl} onChange={set('webhookUrl')}
              hint="PayFlow will POST payment events to this URL"
            />

            {/* perks */}
            <div style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.1)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '1.5rem' }}>
              {['No setup fees during beta', 'Full API access from day one', 'Cancel or delete anytime'].map((t, i, a) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: SUB, marginBottom: i < a.length - 1 ? 7 : 0 }}>
                  <CheckCircle size={13} color={A} style={{ flexShrink: 0 }} />
                  {t}
                </div>
              ))}
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
                : <><span>Create Account</span><ArrowRight size={16} /></>
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: 14, color: SUB }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{ color: A, cursor: 'pointer', fontWeight: 700 }}>Sign in</span>
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