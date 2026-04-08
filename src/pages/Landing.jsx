import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  Zap, Shield, Activity, ArrowRight,
  CheckCircle, Clock, BarChart2, Lock,
} from 'lucide-react';

/* ─── tokens ─────────────────────────────── */
const A       = '#0ea5e9';
const BG      = '#080e1a';
const CARD    = '#0f1929';
const CARD2   = '#0b1422';
const BORDER  = 'rgba(148,163,184,0.1)';
const MUTED   = '#4b5563';
const SUB     = '#94a3b8';

/* ─── data ───────────────────────────────── */
const NAV_LINKS = ['Docs', 'Pricing', 'Changelog'];

const FEATURES = [
  { icon: Zap,       title: 'Idempotent APIs',    desc: 'Duplicate requests never charge twice. Safe retries built-in.',                    tag: 'No duplicate charges', ic: '#38bdf8', ib: 'rgba(56,189,248,0.1)',   tc: '#38bdf8', tb: 'rgba(56,189,248,0.08)'  },
  { icon: Shield,    title: 'ACID Transactions',  desc: 'Every payment runs in a PostgreSQL transaction with row-level locking.',            tag: 'Consistent & safe',    ic: '#34d399', ib: 'rgba(52,211,153,0.1)',   tc: '#34d399', tb: 'rgba(52,211,153,0.08)'  },
  { icon: Activity,  title: 'Async Webhooks',     desc: 'BullMQ delivers merchant notifications with exponential backoff retries.',          tag: 'Reliable delivery',    ic: '#a78bfa', ib: 'rgba(167,139,250,0.1)',  tc: '#a78bfa', tb: 'rgba(167,139,250,0.08)' },
  { icon: BarChart2, title: 'Real-time Tracking', desc: 'Monitor every transaction through its full state machine lifecycle.',              tag: 'Full observability',   ic: '#fb923c', ib: 'rgba(251,146,60,0.1)',   tc: '#fb923c', tb: 'rgba(251,146,60,0.08)'  },
];

const TRUST = [
  { icon: Lock,        label: 'PCI DSS Compliant'    },
  { icon: Clock,       label: '99.99% Uptime SLA'    },
  { icon: CheckCircle, label: 'Idempotency Built-In' },
  { icon: Shield,      label: 'ACID Transactions'    },
];

const STATS = [
  { label: 'Volume (30d)',  value: '$2.4M',  delta: '↑ 18.2%',    up: true  },
  { label: 'Transactions',  value: '38,412', delta: '↑ 11%',       up: true  },
  { label: 'Success Rate',  value: '99.7%',  delta: '0.3% failed', up: false },
];

const TXNS = [
  { id: 'pay_9Kx2mN', merchant: 'Acme Corp',         amt: '$1,240.00', status: 'settled',    c: '#34d399', b: 'rgba(52,211,153,0.1)'  },
  { id: 'pay_7Rw4pQ', merchant: 'Stark Industries',  amt: '$8,500.00', status: 'processing', c: '#38bdf8', b: 'rgba(56,189,248,0.1)'  },
  { id: 'pay_3Tb8yL', merchant: 'Wayne Enterprises', amt: '$320.50',   status: 'settled',    c: '#34d399', b: 'rgba(52,211,153,0.1)'  },
  { id: 'pay_1Zm5vK', merchant: 'Pied Piper',        amt: '$75.00',    status: 'failed',     c: '#f87171', b: 'rgba(248,113,113,0.1)' },
];

const BARS = [45, 60, 38, 70, 55, 80, 65, 90, 75, 85, 78, 95, 88, 100];

/* ─── Fade-in on scroll ──────────────────── */
function Fade({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ─── Shared button styles ───────────────── */
const btnPrimary = {
  background: `linear-gradient(135deg, ${A}, #0284c7)`,
  border: 'none', color: '#fff', padding: '12px 26px', borderRadius: 10,
  fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'inline-flex',
  alignItems: 'center', gap: 8, transition: 'all 0.2s',
  boxShadow: '0 4px 20px rgba(14,165,233,0.25)', letterSpacing: '-0.01em',
};
const btnGhost = {
  background: 'rgba(148,163,184,0.06)', border: `1px solid ${BORDER}`,
  color: SUB, padding: '12px 26px', borderRadius: 10, fontSize: 15,
  fontWeight: 600, cursor: 'pointer', display: 'inline-flex',
  alignItems: 'center', gap: 8, transition: 'all 0.2s', letterSpacing: '-0.01em',
};
const btnSmPrimary = { ...btnPrimary, padding: '8px 18px', fontSize: 13, boxShadow: 'none' };
const btnSmGhost   = { ...btnGhost,   padding: '8px 18px', fontSize: 13 };

/* ─── Component ──────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();
  const [hov, setHov] = useState(null);

  return (
    <div style={{ background: BG, color: '#e2e8f0', fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.9rem 3rem', borderBottom: `1px solid ${BORDER}`,
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,14,26,0.9)', backdropFilter: 'blur(16px)',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 34, height: 34, background: `linear-gradient(135deg,${A},#6366f1)`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 18px rgba(14,165,233,0.4)` }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#f8fafc', letterSpacing: '-0.02em' }}>PayFlow</span>
        </div>

        <div style={{ display: 'flex', gap: '3rem' }}>
          {NAV_LINKS.map(l => (
            <span key={l} style={{ fontSize: 14, color: SUB, cursor: 'pointer', transition: 'color 0.2s', fontWeight: 500 }}
              onMouseEnter={e => e.target.style.color = '#f1f5f9'}
              onMouseLeave={e => e.target.style.color = SUB}>{l}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button style={btnSmGhost}   onClick={() => navigate('/login')}>Sign In</button>
          <button style={btnSmPrimary} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', textAlign: 'center', padding: '7rem 2rem 6rem', overflow: 'hidden' }}>
        {/* glow orbs */}
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: 'radial-gradient(ellipse,rgba(14,165,233,0.18) 0%,transparent 60%)', pointerEvents: 'none', animation: 'orb1 9s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: 80, left: '20%', width: 500, height: 350, background: 'radial-gradient(ellipse,rgba(99,102,241,0.1) 0%,transparent 65%)', pointerEvents: 'none', animation: 'orb2 12s ease-in-out infinite' }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', color: A, fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 99, marginBottom: '2rem' }}>
              <span style={{ width: 7, height: 7, background: A, borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              Now in Production — v2.4.0
            </div>
          </Fade>

          <Fade delay={80}>
            <h1 style={{ fontSize: 'clamp(3.2rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 1.05, color: '#f8fafc', margin: '0 0 1.5rem', letterSpacing: '-0.04em' }}>
              Payment Gateway
              <br />
              <span style={{ background: `linear-gradient(135deg,${A} 0%,#818cf8 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Built for Scale
              </span>
            </h1>
          </Fade>

          <Fade delay={160}>
            <p style={{ fontSize: '1.15rem', color: SUB, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 3rem' }}>
              Idempotent transactions. State machine lifecycle. Async webhook delivery.
              Everything a real payment system needs — production-ready from day one.
            </p>
          </Fade>

          <Fade delay={240}>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={btnPrimary}
                onClick={() => navigate('/register')}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,165,233,0.25)'; }}
              >
                Start Building <ArrowRight size={16} />
              </button>
              <button
                style={btnGhost}
                onClick={() => navigate('/login')}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)'; e.currentTarget.style.color = '#f1f5f9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = SUB; }}
              >
                Sign In
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ══ TRUST STRIP ══════════════════════════════════ */}
      <Fade>
        <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: 'rgba(15,25,41,0.6)', padding: '1.1rem 3rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem' }}>
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: SUB, fontWeight: 500 }}>
                <Icon size={14} color={A} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </Fade>

      {/* ══ FEATURES ══════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '6rem 2rem' }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: 11, color: A, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 14 }}>Core Infrastructure</p>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#f8fafc', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>
              Everything you need to handle money at scale
            </h2>
            <p style={{ fontSize: 16, color: SUB, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
              Engineered for reliability. Designed for developers who can&apos;t afford downtime or duplicate charges.
            </p>
          </div>
        </Fade>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1.25rem' }}>
          {FEATURES.map(({ icon: Icon, title, desc, tag, ic, ib, tc, tb }, i) => (
            <Fade key={title} delay={i * 80}>
              <div
                style={{
                  background: hov === title ? '#131f32' : CARD,
                  border: `1px solid ${hov === title ? 'rgba(14,165,233,0.3)' : BORDER}`,
                  borderRadius: 18, padding: '1.75rem',
                  transition: 'all 0.25s', cursor: 'default',
                  transform: hov === title ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hov === title ? '0 20px 48px rgba(0,0,0,0.4)' : 'none',
                  height: '100%',
                }}
                onMouseEnter={() => setHov(title)}
                onMouseLeave={() => setHov(null)}
              >
                <div style={{ width: 46, height: 46, background: ib, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={20} color={ic} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: '1.25rem' }}>{desc}</p>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99, color: tc, background: tb, border: `1px solid ${tc}22` }}>
                  {tag}
                </span>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ══ DASHBOARD MOCK ════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: 11, color: A, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 14 }}>Live Preview</p>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#f8fafc', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>Your payment operations, at a glance</h2>
            <p style={{ fontSize: 16, color: SUB, maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
              Real-time view of payment volume, transaction health, and webhook delivery.
            </p>
          </div>
        </Fade>

        <Fade delay={100}>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '1rem 1.5rem', borderBottom: `1px solid ${BORDER}`, background: CARD2 }}>
              {['#ef4444', '#f59e0b', '#22c55e'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.8 }} />)}
              <span style={{ marginLeft: 10, fontSize: 12, color: MUTED, fontFamily: 'monospace' }}>merchant.payflow.dev/dashboard</span>
            </div>

            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '1.1rem' }}>
                  <p style={{ fontSize: 11, color: MUTED, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
                  <p style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9', marginBottom: 4, letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: s.up ? '#34d399' : MUTED }}>{s.delta}</p>
                </div>
              ))}

              <div style={{ gridColumn: '1/-1', background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '1.1rem' }}>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Payment volume — last 14 days</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 90 }}>
                  {BARS.map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', minWidth: 14, background: i >= 11 ? A : 'rgba(14,165,233,0.28)', transition: 'background 0.2s' }} />
                  ))}
                </div>
              </div>

              <div style={{ gridColumn: '1/-1', background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '0.8rem 1.25rem', borderBottom: `1px solid ${BORDER}`, fontSize: 11, color: MUTED, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Recent transactions
                </div>
                {TXNS.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.7rem 1.25rem', fontSize: 13, borderBottom: i < TXNS.length - 1 ? `1px solid rgba(148,163,184,0.05)` : 'none' }}>
                    <span style={{ fontFamily: 'monospace', color: MUTED, fontSize: 12 }}>{t.id}</span>
                    <span style={{ color: '#cbd5e1' }}>{t.merchant}</span>
                    <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{t.amt}</span>
                    <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, color: t.c, background: t.b }}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* ══ CODE BLOCK ════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: 11, color: A, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 14 }}>Developer-First</p>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#f8fafc', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>Simple REST APIs. Powerful guarantees.</h2>
            <p style={{ fontSize: 16, color: SUB, maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
              Integrate in minutes. Plain HTTP with JSON. Full idempotency on every endpoint.
            </p>
          </div>
        </Fade>
        <Fade delay={100}>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: `1px solid ${BORDER}`, background: CARD2 }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontSize: 13, color: A, borderBottom: `1.5px solid ${A}`, paddingBottom: 3, cursor: 'pointer', fontWeight: 600 }}>Create Payment</span>
                <span style={{ fontSize: 13, color: MUTED, cursor: 'pointer' }}>List Transactions</span>
              </div>
              <span style={{ fontSize: 11, color: MUTED, background: BG, padding: '3px 10px', borderRadius: 6, border: `1px solid ${BORDER}` }}>REST / JSON</span>
            </div>
            <pre style={{ padding: '1.75rem', fontSize: 13, lineHeight: 2, overflowX: 'auto', margin: 0, fontFamily: "'Fira Code','Cascadia Code',monospace" }}>
              <span style={{ color: '#475569' }}># Create an idempotent payment{'\n'}</span>
              <span style={{ color: '#a78bfa' }}>POST </span><span style={{ color: '#34d399' }}>/api/v1/payments{'\n\n'}</span>
              <span style={{ color: '#38bdf8' }}>Authorization</span>{': Bearer '}<span style={{ color: '#fb923c' }}>pk_live_xxxxxxxxxxxx{'\n'}</span>
              <span style={{ color: '#38bdf8' }}>Idempotency-Key</span>{': '}<span style={{ color: '#fb923c' }}>order_7f3a9b2c_attempt_1{'\n'}</span>
              <span style={{ color: '#38bdf8' }}>Content-Type</span>{': '}<span style={{ color: '#fb923c' }}>application/json{'\n\n'}</span>
              {'{\n  '}<span style={{ color: '#38bdf8' }}>"amount"</span>{': '}<span style={{ color: '#fb923c' }}>124000</span><span style={{ color: '#475569' }}>,  // cents{'\n  '}</span>
              <span style={{ color: '#38bdf8' }}>"currency"</span>{': '}<span style={{ color: '#fb923c' }}>"USD"</span>{',\n  '}
              <span style={{ color: '#38bdf8' }}>"merchant_id"</span>{': '}<span style={{ color: '#fb923c' }}>"merch_acme_001"</span>
              {'\n}\n\n'}
              <span style={{ color: '#475569' }}># Response — 201 Created{'\n'}</span>
              {'{\n  '}<span style={{ color: '#38bdf8' }}>"payment_id"</span>{': '}<span style={{ color: '#fb923c' }}>"pay_9Kx2mNrTq"</span>{',\n  '}
              <span style={{ color: '#38bdf8' }}>"status"</span>{': '}<span style={{ color: '#fb923c' }}>"processing"</span>{',\n  '}
              <span style={{ color: '#38bdf8' }}>"idempotent"</span>{': '}<span style={{ color: '#a78bfa' }}>false</span>{'\n}'}
            </pre>
          </div>
        </Fade>
      </section>

      {/* ══ FOOTER CTA ════════════════════════════════════ */}
      <section style={{ position: 'relative', textAlign: 'center', padding: '7rem 2rem 6rem', borderTop: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 800, height: 500, background: 'radial-gradient(ellipse,rgba(14,165,233,0.12) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <Fade>
          <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', color: A, fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 99, marginBottom: '2rem' }}>
              <span style={{ width: 7, height: 7, background: A, borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              Free during beta — no credit card needed
            </div>
            <h2 style={{ fontSize: 'clamp(2.4rem,5.5vw,4rem)', fontWeight: 900, color: '#f8fafc', margin: '0 0 1rem', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
              Start Building with<br /><span style={{ color: A }}>PayFlow Today</span>
            </h2>
            <p style={{ fontSize: 17, color: SUB, marginBottom: '3rem', lineHeight: 1.75 }}>
              Production-grade payment infrastructure for serious teams.<br />Go live in hours, not weeks.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={btnPrimary}
                onClick={() => navigate('/register')}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,165,233,0.25)'; }}
              >
                Create Account <ArrowRight size={16} />
              </button>
              <button
                style={btnGhost}
                onClick={() => navigate('/login')}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)'; e.currentTarget.style.color = '#f1f5f9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = SUB; }}
              >
                Sign In
              </button>
            </div>
          </div>
        </Fade>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '1.5rem 3rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'rgba(6,10,18,0.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 26, height: 26, background: `linear-gradient(135deg,${A},#6366f1)`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={12} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#f8fafc' }}>PayFlow</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Status', 'GitHub', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 13, color: MUTED, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = SUB}
              onMouseLeave={e => e.target.style.color = MUTED}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: 12, color: MUTED }}>© 2026 PayFlow Inc.</span>
      </footer>

      <style>{`
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes orb1   { 0%,100%{opacity:1;transform:translateX(-50%) scale(1)} 50%{opacity:0.7;transform:translateX(-50%) scale(1.1)} }
        @keyframes orb2   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.15)} }
        html, body, #root { margin: 0; padding: 0; width: 100%; background: #080e1a; }
        * { box-sizing: border-box; }
        pre { background: transparent !important; }
      `}</style>
    </div>
  );
}